
module.exports = (connection) => {

	class user_types {
		/**
		 * Model of user_types for mysql
		 * @constructor
	   * @param {String} name
	   * @param {Number} created_date
		 * 
		 */
		constructor(name,created_date){
			this.user_type_id = null;
			this.name = name;
			this.description = null;
			this.created_date = created_date;
		}
	}

	return {
		model: user_types
	}

}
			