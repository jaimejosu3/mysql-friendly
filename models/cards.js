
module.exports = (connection) => {

	class cards {
		/**
		 * Model of cards for mysql
		 * @constructor
	   * @param {Number} app_user_id
	   * @param {String} bac_token
	   * @param {String} customer_reference
	   * @param {String} brand
	   * @param {String} name
	   * @param {String} exp_month
	   * @param {String} exp_year
	   * @param {String} cvv
	   * @param {String} last_digits
	   * @param {Boolean} is_default
	   * @param {Number} created_date
		 * 
		 */
		constructor(app_user_id,bac_token,customer_reference,brand,name,exp_month,exp_year,cvv,last_digits,is_default,created_date){
			this.card_id = null;
			this.app_user_id = app_user_id;
			this.bac_token = bac_token;
			this.customer_reference = customer_reference;
			this.brand = brand;
			this.name = name;
			this.exp_month = exp_month;
			this.exp_year = exp_year;
			this.cvv = cvv;
			this.last_digits = last_digits;
			this.is_default = is_default;
			this.created_date = created_date;
		}
	}

	return {
		model: cards
	}

}
			