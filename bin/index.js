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
			let paramsConstructorFunction = ''
			forIndex += `
		${item}: require("./${item}")(connection),`
			tables[item].forEach(field=>{
				if(field.IS_NULLABLE == "NO" && field.EXTRA != "auto_increment"){
					paramsConstructor += `
	   * @param {${types[field.DATA_TYPE]}} ${field.COLUMN_NAME}`
					paramsConstructorFunction += ','+field.COLUMN_NAME
				}

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

	return {
		model: ${item}
	}

}
			`;
			fs.writeFile('./models/'+item+'.js', fileContent, function (err) {
				if (err) return console.log(err);
				console.log('Hello World > helloworld.txt');
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
		});


		console.log(tables);

	}
}