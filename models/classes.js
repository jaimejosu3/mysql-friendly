
module.exports = (connection) => {

	class classes {
		/**
		 * Model of classes for mysql
		 * @constructor
	   * @param {Number} host_id
	   * @param {Number} class_categoty_id
	   * @param {Number} class_subcategory_id
	   * @param {Number} city_id
	   * @param {String} banner_url
	   * @param {String} name
	   * @param {String} description
	   * @param {String} amenities
	   * @param {Object} location
		 * 
		 */
		constructor(host_id,class_categoty_id,class_subcategory_id,city_id,banner_url,name,description,amenities,location){
			this.class_id = null;
			this.host_id = host_id;
			this.class_categoty_id = class_categoty_id;
			this.class_subcategory_id = class_subcategory_id;
			this.city_id = city_id;
			this.banner_url = banner_url;
			this.square_pic_url = null;
			this.name = name;
			this.description = description;
			this.amenities = amenities;
			this.location = location;
		}
	}

	return {
		model: classes
	}

}
			