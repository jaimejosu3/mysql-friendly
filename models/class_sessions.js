
module.exports = (connection) => {

	class class_sessions {
		/**
		 * Model of class_sessions for mysql
		 * @constructor
	   * @param {Number} class_id
	   * @param {Date} datetime_start
	   * @param {Date} datetime_end
	   * @param {Number} max_seats
	   * @param {Number} reserved_seats
	   * @param {Number} fitpoints_price
	   * @param {Number} currency_price
	   * @param {Boolean} has_offer
		 * 
		 */
		constructor(class_id,datetime_start,datetime_end,max_seats,reserved_seats,fitpoints_price,currency_price,has_offer){
			this.class_session_id = null;
			this.class_id = class_id;
			this.datetime_start = datetime_start;
			this.datetime_end = datetime_end;
			this.max_seats = max_seats;
			this.reserved_seats = reserved_seats;
			this.fitpoints_price = fitpoints_price;
			this.currency_price = currency_price;
			this.has_offer = has_offer;
			this.offer = null;
		}
	}

	return {
		model: class_sessions
	}

}
			