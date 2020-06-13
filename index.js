let mysql      = require('mysql');
require('dotenv').config({ path: '/var/env/gymify/.env' })

let connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});
 
connection.connect(function(err) {
	if (err) {
		console.error('Error connecting: ' + err.stack);
		return;
	}

	if(process.env.BUILD_MYSQL){
		//require("./bin").buildModels(connection,process.env.DB_NAME)
	}
 
	console.log('MySQL Connected as id ' + connection.threadId);
});

module.exports = require("./models")(connection);