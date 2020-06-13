
module.exports = (connection) => {

	class remembers_by_users {
		/**
		 * Model of remembers_by_users for mysql
		 * @constructor
	   * @param {Number} app_user_id
	   * @param {Number} remember_id
	   * @param {Boolean} enabled
		 * 
		 */
		constructor(app_user_id,remember_id,enabled){
			this.app_user_id = app_user_id;
			this.remember_id = remember_id;
			this.enabled = enabled;
		}
	}

	return {
		model: remembers_by_users
	}

}
			