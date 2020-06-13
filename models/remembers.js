
module.exports = (connection) => {

	class remembers {
		/**
		 * Model of remembers for mysql
		 * @constructor
	   * @param {String} unit
	   * @param {Number} value
	   * @param {String} description
		 * 
		 */
		constructor(unit,value,description){
			this.remember_id = null;
			this.unit = unit;
			this.value = value;
			this.description = description;
		}
	}

	return {
		model: remembers
	}

}
			