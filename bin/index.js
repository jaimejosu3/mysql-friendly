const fs = require('fs');
const tables = {}
const types = {
	int: "Number",
	varchar: "String",
	timestamp: "Number",
	point: "Object",
	datetime: "Date",
	tinyint: "Boolean"
}
module.exports = {
	buildModels: async (connection,dbName) => {
		let countTables = 0
		const getAllFields = () => {
			return new Promise(resolve => {
				connection.query('SELECT * FROM information_schema.columns WHERE table_schema =  ? ',dbName , (err, result) => {
					if(err) 
							resolve({error: "error on mysql", info: err})
					else
							resolve(result)
				});
			})
		}

		const getRelationsFromTable = async (dbName,tableName) => {
			connection.query(`
				SELECT
						TABLE_NAME,
						COLUMN_NAME,
						CONSTRAINT_NAME,
						REFERENCED_TABLE_NAME,
						REFERENCED_COLUMN_NAME
				FROM
						INFORMATION_SCHEMA.KEY_COLUMN_USAGE
				WHERE
					REFERENCED_TABLE_SCHEMA = ?
						AND TABLE_NAME = ?;`,
			[dbName,tableName] , (err, result) => {
				if(err) 
						return {error: "error on mysql", info: err}
				else
						return result
			});
		}

		let result = await getAllFields()
	
		result.forEach(element => {
			if(tables[element.TABLE_NAME]){
				tables[element.TABLE_NAME].push(element)
			}else{
				tables[element.TABLE_NAME] = [element]
			}
		});
		let forIndex = ''

		Object.keys(tables).forEach(function (item) {
			let paramsConstructor = ''
			let fields = ''
			let enumFields = ""
			let paramsConstructorFunction = ''
			forIndex += `
		${item}: require("./${item}")(connection),`
			tables[item].forEach(field=>{
				if(field.IS_NULLABLE == "NO" && field.EXTRA != "auto_increment"){
					paramsConstructor += `
	   * @param {${types[field.DATA_TYPE]}} ${field.COLUMN_NAME}`
					paramsConstructorFunction += ','+field.COLUMN_NAME
				}
				if(enumFields != "") enumFields += "|"
				enumFields +=`"${field.COLUMN_NAME}"`
				fields += `
			this.${field.COLUMN_NAME} = ${field.IS_NULLABLE == "NO" && field.EXTRA != "auto_increment" ? field.COLUMN_NAME : 'null' };`

			})
			let fileContent = `
module.exports = (connection) => {

	class ${item} {
		/**
		 * Model of ${item} for mysql
		 * @constructor${paramsConstructor}
		 * 
		 */
		constructor(${paramsConstructorFunction.substr(1)}){${fields}
		}
	}

	/**
	 * Select fields for query sending array of fields
	 * @param {[(${enumFields})]} fields
	 */
	const select = (fields = []) => {
		let result = "SELECT "
		let whereStatement = "WHERE ";
		let skipValue = 0;
		let limitValue = 0;
		if(fields && fields.length > 0){
			fields.forEach(field=>{
				result += field+", ";
			})
			result = result.slice(0, -2) + " ";
		}else{
			result += "* "
		}

		result += "FROM ${item} "

		/**
		 * Set skip value for query
		 * @param {Number} a
		 */
		const skip = (a) => {
			skipValue = a
			return {
				limit,
				get
			}
		}
		
		/**
		 * Set limit value for query
		 * @param {Number} a
		 */
		const limit = (a) => {
			limitValue = a
			return {
				get
			}
		}

		/**
		 * Set order field and type
		 * @param {(${enumFields})} order
		 * @param {("ASC"|"DESC")} type
		 */
		const orderBy = (order,type) => {
			result += "ORDER BY " + order + " " + type + " "
			return {
				skip,
				limit,
				get
			}
		}

		/**
		 * Concatenate 'or' condition to where
		 * @param {(${enumFields})} field
		 * @param {("="|"!="|">"|">="|"<"|"<="|"LIKE")} operator
		 * @param {String} value
		 */
		const or = (field,operator,value) => { 
			whereStatement = "OR "; 
			return where(field,operator,value)
		}
		
		/**
		 * Concatenate 'and' condition to where
		 * @param {(${enumFields})} field
		 * @param {("="|"!="|">"|">="|"<"|"<="|"LIKE")} operator
		 * @param {String} value
		 */
		const and = (field,operator,value) => { 
			whereStatement = "AND "; 
			return where(field,operator,value)
		}

		/**
		 * Create where condition to query
		 * @param {(${enumFields})} field
		 * @param {("="|"!="|">"|">="|"<"|"<="|"LIKE")} operator
		 * @param {String} value
		 */
		const where = (field,operator,value) => {
			result += whereStatement + " " + field + " " + operator + " '" + value +"' "
			return {
				or,
				and,
				orderBy,
				skip,
				limit,
				get
			}
		}

	/**
	 * Return result of query, an array of objects
	 * @return {Promise<[${item}]>} A promise ${item}.
	 */
		const get = () =>{
			return new Promise((resolve)=>{
				if(limitValue)
					result += "LIMIT "+parseInt(skipValue || 0)+","+parseInt(limitValue)+ " "
				console.log(result);
				connection.query({
						sql:result
					},(err,results,fields)=>{
						if(err)
							resolve([]); 
						else 
							resolve(results);
				});
			})
		}

		return {
			where,
			orderBy,
			get
		} 
	}

	/**
	 * Create an ${item} element but no insert
	 * ${paramsConstructor}
	 * 
	 *
	 * 
	 * @returns {${item}}
	 */
	const make = (${paramsConstructorFunction.substr(1)}) => { return new ${item}(${paramsConstructorFunction.substr(1)}) }

	return {
		make,
		select
	}

}
			`;
			fs.writeFile('./models/'+item+'.js', fileContent, function (err) {
				if (err) return console.log(err);
				countTables ++
				console.log('Created '+item+ ' model successfull.');
				if(countTables == result.length){
					return "SUCCESS"
				}
			});
		});

		let indexjs = `
module.exports = (connection) => {
	return {
${forIndex}
	}
}
		`
		fs.writeFile('./models/index.js', indexjs, function (err) {
			if (err) return console.log(err);
			console.log('Hello World > helloworld.txt');
			if(countTables == result.length){
				return "SUCCESS"
			}
		});

	}
}