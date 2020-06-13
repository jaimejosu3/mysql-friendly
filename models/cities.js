
module.exports = (connection) => {

	class cities {
		/**
		 * Model of cities for mysql
		 * @constructor
	   * @param {String} name
	   * @param {String} currency_symbol
		 * 
		 */
		constructor(name,currency_symbol){
			this.city_id = null;
			this.name = name;
			this.location = null;
			this.currency_symbol = currency_symbol;
		}
	}

	return {
		model: cities
	}

}
			