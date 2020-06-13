
module.exports = (connection) => {

	class class_categories {
		/**
		 * Model of class_categories for mysql
		 * @constructor
	   * @param {String} name
	   * @param {String} description
		 * 
		 */
		constructor(name,description){
			this.class_category_id = null;
			this.name = name;
			this.description = description;
		}
	}

	return {
		model: class_categories
	}

}
			