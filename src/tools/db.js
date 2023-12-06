const path = require('path');
const mysql = require('mysql');
const configs = require(path.join(__dirname, "./configs.js"));

require('dotenv').config(configs.tools_config_obj);

const connection = mysql.createConnection({ 
	host: process.env.MYSQL_HOSTNAME,
	user: process.env.MYSQL_KEYSUE_USERNAME, 
	password: process.env.MYSQL_KEYSUE_PASSWORD,
	database: 'keysue'
})

connection.connect((err)=>{
	if(err) throw err;
	console.log('Connected to keysue!');
});

module.exports = connection;
