
module.exports = (connection) => {

	class app_configurations {
		/**
		 * Model of app_configurations for mysql
		 * @constructor
	   * @param {Number} app_version_id
	   * @param {Number} fitpoint_expiration_value
	   * @param {String} fitpoint_expiration_unit
		 * 
		 */
		constructor(app_version_id,fitpoint_expiration_value,fitpoint_expiration_unit){
			this.app_configuration_id = null;
			this.app_version_id = app_version_id;
			this.fitpoint_expiration_value = fitpoint_expiration_value;
			this.fitpoint_expiration_unit = fitpoint_expiration_unit;
		}
	}

	return {
		model: app_configurations
	}

}
			