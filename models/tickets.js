
module.exports = (connection) => {

	class tickets {
		/**
		 * Model of tickets for mysql
		 * @constructor
	   * @param {Number} app_user_id
	   * @param {Number} class_session_id
	   * @param {Number} ticket_status_id
	   * @param {Number} cant
	   * @param {Date} purchase_date
	   * @param {String} ticket_code
		 * 
		 */
		constructor(app_user_id,class_session_id,ticket_status_id,cant,purchase_date,ticket_code){
			this.ticket_id = null;
			this.app_user_id = app_user_id;
			this.class_session_id = class_session_id;
			this.ticket_status_id = ticket_status_id;
			this.cant = cant;
			this.purchase_date = purchase_date;
			this.ticket_code = ticket_code;
		}
	}

	return {
		model: tickets
	}

}
			