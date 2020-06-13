class Select {
	constructor(tableName,connection,fields){
		this.tableName = tableName
		this.connection = connection
		this.fields = fields
	}

	query(){
		if(this.fields.length > 0){

		}else{
			return "SELECT * FROM "+ this.tableName
		}
	}

	get(){
		return new Promise(resolve => {
			this.connection.query(this.query(), (err, result) => {
				if(err)
						resolve({error: "error_on_mysql", info: err}) 
				else if(result.length > 0) 
						resolve(result)
				else
						resolve({error:"cities not found"})
			});
		})
	}

}

class MysqlMetadata {
	constructor(tableName,connection){ 
		this.tableName = tableName
		this.connection = connection
		this.fields = []
	}
	
}

module.exports = MysqlMetadata