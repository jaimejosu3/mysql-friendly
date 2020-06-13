module.exports = (connection) => {

	class app_users {
		/**
		 * Model of app_users for mysql
		 * @constructor
	   * @param {String} first_name
	   * @param {String} last_name
	   * @param {String} country_code
	   * @param {String} phone
	   * @param {String} identity
	   * @param {Number} user_id
	   * @param {Number} app_version_id
	   * @param {Number} city_id
	   * @param {Number} fitpoints_balance
		 * 
		 */
		constructor(first_name,last_name,country_code,phone,identity,user_id,app_version_id,city_id,fitpoints_balance){
			this.app_user_id = null;
			this.first_name = first_name;
			this.last_name = last_name;
			this.country_code = country_code;
			this.phone = phone;
			this.profile_pic_url = null;
			this.device_id = null;
			this.identity = identity;
			this.user_id = user_id;
			this.app_version_id = app_version_id;
			this.city_id = city_id;
			this.created_date = null;
			this.updated_date = null;
			this.fitpoints_balance = fitpoints_balance;
		}

	}

	/**
	 * Select fields for query sending array of fields
	 * @param {[("first_name"|"last_name")]} fields
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

		result += "FROM app_users "

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
		 * @param {("first_name"|"last_name")} order
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
		 * @param {("first_name"|"last_name")} field
		 * @param {("="|"!="|">"|">="|"<"|"<="|"LIKE")} operator
		 * @param {String} value
		 */
		const or = (field,operator,value) => { 
			whereStatement = "OR "; 
			return where(field,operator,value)
		}
		
		/**
		 * Concatenate 'and' condition to where
		 * @param {("first_name"|"last_name")} field
		 * @param {("="|"!="|">"|">="|"<"|"<="|"LIKE")} operator
		 * @param {String} value
		 */
		const and = (field,operator,value) => { 
			whereStatement = "AND "; 
			return where(field,operator,value)
		}

		/**
		 * Create where condition to query
		 * @param {("first_name"|"last_name")} field
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
	 * @return {Promise<[app_users]>} A promise app_user.
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
	 * Model of app_users for mysql
	 * @param {String} first_name
	 * @param {String} last_name
	 * @param {String} country_code
	 * @param {String} phone
	 * @param {String} identity
	 * @param {Number} user_id
	 * @param {Number} app_version_id
	 * @param {Number} city_id
	 * @param {Number} fitpoints_balance
	 * 
	 * @returns {app_users}
	 */
	const make = (first_name,last_name,country_code,phone,identity,user_id,app_version_id,city_id,fitpoints_balance) => { return new app_users(first_name,last_name,country_code,phone,identity,user_id,app_version_id,city_id,fitpoints_balance) }

	return {
		make,
		select
	}

}
			