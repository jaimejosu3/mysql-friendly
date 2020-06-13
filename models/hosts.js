
module.exports = (connection) => {

	class hosts {
		/**
		 * Model of hosts for mysql
		 * @constructor
	   * @param {String} name
	   * @param {String} address
	   * @param {Object} location
	   * @param {String} banner_url
		 * 
		 */
		constructor(name,address,location,banner_url){
			this.host_id = null;
			this.name = name;
			this.address = address;
			this.location = location;
			this.banner_url = banner_url;
			this.created_date = null;
		}
	}

	return {
		model: hosts
	}

}
			