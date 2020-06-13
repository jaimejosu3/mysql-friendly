
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

	return {
		model: app_users
	}

}
			