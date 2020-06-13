
module.exports = (connection) => {

	class app_versions {
		/**
		 * Model of app_versions for mysql
		 * @constructor
	   * @param {Number} build_number
	   * @param {String} version
	   * @param {Boolean} mandatory
		 * 
		 */
		constructor(build_number,version,mandatory){
			this.app_version_id = null;
			this.build_number = build_number;
			this.version = version;
			this.mandatory = mandatory;
		}
	}

	return {
		model: app_versions
	}

}
			