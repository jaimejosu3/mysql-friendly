
module.exports = (connection) => {

	class fitpoint_products {
		/**
		 * Model of fitpoint_products for mysql
		 * @constructor
	   * @param {Number} cant
	   * @param {Number} price
	   * @param {Boolean} deleted
		 * 
		 */
		constructor(cant,price,deleted){
			this.fitpoint_product_id = null;
			this.cant = cant;
			this.price = price;
			this.deleted = deleted;
		}
	}

	return {
		model: fitpoint_products
	}

}
			