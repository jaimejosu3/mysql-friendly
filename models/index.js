
module.exports = (connection) => {
	return {

		app_configurations: require("./app_configurations")(connection),
		app_users: require("./app_users")(connection),
		app_versions: require("./app_versions")(connection),
		cards: require("./cards")(connection),
		cities: require("./cities")(connection),
		class_categories: require("./class_categories")(connection),
		class_requirements: require("./class_requirements")(connection),
		class_sessions: require("./class_sessions")(connection),
		class_subcategories: require("./class_subcategories")(connection),
		classes: require("./classes")(connection),
		currency_transactions: require("./currency_transactions")(connection),
		fitpoint_products: require("./fitpoint_products")(connection),
		fitpoint_transactions: require("./fitpoint_transactions")(connection),
		hosts: require("./hosts")(connection),
		remembers: require("./remembers")(connection),
		remembers_by_users: require("./remembers_by_users")(connection),
		ticket_status: require("./ticket_status")(connection),
		tickets: require("./tickets")(connection),
		user_types: require("./user_types")(connection),
		users: require("./users")(connection),
	}
}
		