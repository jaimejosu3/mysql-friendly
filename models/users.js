
module.exports = (connection) => {

	class users {
		/**
		 * Model of users for mysql
		 * @constructor
	   * @param {String} email
	   * @param {String} password
	   * @param {Number} user_type_id
		 * 
		 */
		constructor(email,password,user_type_id){
			this.email = email;
			this.password = password;
			this.create_time = null;
			this.user_id = null;
			this.user_type_id = user_type_id;
		}
	}

	return {
		model: users
	}

}
			