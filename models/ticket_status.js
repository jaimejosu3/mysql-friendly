
module.exports = (connection) => {

	class ticket_status {
		/**
		 * Model of ticket_status for mysql
		 * @constructor
	   * @param {String} name
	   * @param {String} description
		 * 
		 */
		constructor(name,description){
			this.ticket_status_id = null;
			this.name = name;
			this.description = description;
		}
	}

	return {
		model: ticket_status
	}

}
			