
module.exports = (connection) => {

	class currency_transactions {
		/**
		 * Model of currency_transactions for mysql
		 * @constructor
	   * @param {Number} app_user_id
	   * @param {String} type
	   * @param {Number} cant
	   * @param {Date} date
		 * 
		 */
		constructor(app_user_id,type,cant,date){
			this.currency_transaction_id = null;
			this.app_user_id = app_user_id;
			this.card_id = null;
			this.fitpoint_product_id = null;
			this.class_session_id = null;
			this.type = type;
			this.cant = cant;
			this.date = date;
			this.notes = null;
		}
	}

	return {
		model: currency_transactions
	}

}
			