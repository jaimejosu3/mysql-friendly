
module.exports = (connection) => {

	class ticket_status {
		/**
		 * Model of ticket_status for mysql
		 * @constructor
	   * @param {String} name
	   * @param {String} description
	   * @param {String} code
		 * 
		 */
		constructor(name,description,code){
			this.ticket_status_id = null;
			this.name = name;
			this.description = description;
			this.code = code;
		}
	}

	return {
		model: ticket_status
	}

}
			