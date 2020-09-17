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

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

module.exports = {
	buildModels: async (connection,dbName) => {
		let countTables = 0
		let indexCreated = false;
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

		const checkDir = async () => {
			if (!fs.existsSync(__dirname+"/../models")){
				return fs.mkdirSync(__dirname+"/../models");
			}else{
				return true
			}
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
		await checkDir();
		let result = await getAllFields()
	
		result.forEach(element => {
			if(tables[element.TABLE_NAME]){
				tables[element.TABLE_NAME].push(element)
			}else{
				tables[element.TABLE_NAME] = [element]
			}
		});
		let forIndex = ''
		
		await asyncForEach(Object.keys(tables),async (item) => {
			let foreignFieldsObjects = await getRelationsFromTable(item);

			let paramsConstructor = ''
			let fields = ''
			let enumFields = ""
			let insertFields = ""
			let paramsConstructorFunction = ''
			let primaryKey = ""
			let pointField = ""
			forIndex += `
		${item}: require("./${item}")(connection),`
			tables[item].forEach(field=>{
				if(field.IS_NULLABLE == "NO" && field.EXTRA != "auto_increment"){
					paramsConstructor += `
	   * @param {${types[field.DATA_TYPE]}} ${field.COLUMN_NAME}`
					paramsConstructorFunction += ','+field.COLUMN_NAME
				}
				if(field.COLUMN_KEY == "PRI") primaryKey = field.COLUMN_NAME
				if(enumFields != "") enumFields += "|"
				enumFields +=`"${field.COLUMN_NAME}"`
				fields += `
			this.${field.COLUMN_NAME} = ${field.IS_NULLABLE == "NO" && field.EXTRA != "auto_increment" ? field.COLUMN_NAME : 'null' };`
				if(field.DATA_TYPE != "point") {
					insertFields += `${field.COLUMN_NAME}: this.${field.COLUMN_NAME},`
				}else{
					pointField = field.COLUMN_NAME
				}
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

		/**
		 * Return result of INSERT, an object
		 * @return {Promise<${item}>} A promise ${item}.
		 */
		insert(ignoreDuplicate){
			return new Promise((resolve,reject)=>{
				connection.query('INSERT ' + ignoreDuplicate ? 'IGNORE' : '' +' INTO ${item} SET ? ${pointField != "" ? `, \`${pointField}\` = POINT('+this.${pointField}.lat+','+this.${pointField}.long+');`: ''}' , {
					${insertFields}
				} ,(err,results,fields)=>{
					if(err){
						reject(err)
					}else{
						this.${primaryKey} = results.insertId
						resolve(this)
					}
				});
			})
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
			get,
			skip,
			limit
		} 
	}

	const update = () => {
		let result = "UPDATE ${item} SET "
    let params = []
		let whereStatement = "WHERE ";

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
				execute
			}
		}

		/**
		 * Create set value to query
		 * @param {(${enumFields})} field
		 * @param {String|Number|Date|Boolean} value
		 */
		const set = (field,value) => {
			if(params.length != 0) result += ", "
			result += field+" = ? ";
			params.push(value)
			return {
				where,
				set
			}
		}
		
	/**
	 * Return result of query, an array of objects
	 * @return {Promise<any>} A promise ${item}.
	 */
		const execute = () => {
			return new Promise((resolve)=>{
				connection.query(result, params ,(err,results,fields)=>{
					err ? resolve(err) : resolve(results);
				});
			});
		}

		return {
			set,
		}
	}

	const remove = () => {
		let result = "DELETE FROM ${item} "
    let params = []
		let whereStatement = "WHERE ";

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
				execute
			}
		}
		
	/**
	 * Return result of query, an array of objects
	 * @return {Promise<any>} A promise ${item}.
	 */
		const execute = () => {
			return new Promise((resolve)=>{
				connection.query(result, params ,(err,results,fields)=>{
					err ? resolve(err) : resolve(results);
				});
			});
		}

		return {
			where
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
		select,
		update,
		remove
	}

}
			`;
			fs.writeFile(__dirname+'/../models/'+item+'.js', fileContent, function (err) {
				if (err) return console.log(err);
				countTables ++
				//console.log('Created '+item+ ' model successfull.',countTables, Object.keys(tables).length, indexCreated);
				if(countTables == Object.keys(tables).length && indexCreated){
					
					console.log("Models created, import module and use your models.")
					process.exit(1)
				}
				return true;
			});
		});

		let indexjs = `
module.exports = (connection) => {
	return {
${forIndex}
	}
}
		`
		fs.writeFile(__dirname+'/../models/index.js', indexjs, function (err) {
			if (err) return console.log(err);
			indexCreated = true;
			if(countTables == Object.keys(tables).length){
				console.log("Models created, import module and use your models.")
				process.exit(0);
			}
		});

	}
}