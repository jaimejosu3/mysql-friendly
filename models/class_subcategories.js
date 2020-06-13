
module.exports = (connection) => {

	class class_subcategories {
		/**
		 * Model of class_subcategories for mysql
		 * @constructor
	   * @param {Number} class_category_id
	   * @param {String} name
	   * @param {String} description
		 * 
		 */
		constructor(class_category_id,name,description){
			this.class_subcategory_id = null;
			this.class_category_id = class_category_id;
			this.name = name;
			this.description = description;
		}
	}

	return {
		model: class_subcategories
	}

}
			