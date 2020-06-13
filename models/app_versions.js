const MysqlMetadata = require("../bin/query");

class appVersionsModel {
	/**
	 * Model of app_versions for mysql
	 * @constructor
	 * @param {Number} build_number
	 * @param {String} version
	 * @param {Boolean} mandatory
	 * 
	 */
	constructor(build_number,version,mandatory){
		this.build_number = build_number;
		this.version = version;
		this.mandatory = mandatory;
	}

}

module.exports = class appVersions{
	/**
	 * Model of app_versions for mysql
	 * @constructor
	 * @param {Object} connection
	 * 
	 */
	constructor(connection){
		this.mysqlMetadata = new MysqlMetadata("app_versions",connection);
	}

	/**
	 * @constructor
	 * @param {[('app_version_id'|'build_number'|'version'|'mandatory')]} fields
	 * Leave without fields for get all columns
	 * @returns {appVersions}
	 */
	Select(fields = []){
		this.mysqlMetadata.fields = fields
		return this
	}
}
			