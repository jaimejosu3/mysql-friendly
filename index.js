let mysql      = require('mysql');
require('dotenv').config()
let connection;

function handleError () {
	connection = mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		charset:'utf8mb4'
	});
    // Connection error, 2 seconds retry
    connection.connect(function (err) {
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleError , 2000);
        }
    });

    connection.on('error', function (err) {
        console.log('db error', err);
        // If the connection is disconnected, automatically reconnect
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            process.exit(1)
        } else {
            throw err;
        }
    });
}

handleError();

const checkModels = () => {
	try{
		return require("./models")(connection)
	}catch(e){
		console.log("Please buildModels first")
		process.exit(1)
	}
}

const buildModels = () => {
	return require("./bin").buildModels(connection,process.env.DB_NAME)
}

module.exports = {
	buildModels: buildModels,
	models: checkModels,
	connection :connection
};
