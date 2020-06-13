
module.exports = (connection) => {

	class class_requirements {
		/**
		 * Model of class_requirements for mysql
		 * @constructor
	   * @param {Number} class_id
	   * @param {String} description
		 * 
		 */
		constructor(class_id,description){
			this.class_requirement_id = null;
			this.class_id = class_id;
			this.description = description;
		}
	}

	return {
		model: class_requirements
	}

}
			