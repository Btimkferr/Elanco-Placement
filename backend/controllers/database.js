const mysql = require('mysql2/promise');
const config = require('../utils/config');
const fs = require('fs');

const con =  mysql.createPool({
    host: process.env.DB_HOST,
    port: 3306,
    database: config.DB_NAME,
    user: config.DB_USER,
    password: config.DB_PASS,
    ssl: { rejectUnauthorized: false, 
        ca: fs.readFileSync('./global-bundle.pem') 
    },
    connectionLimit: 10
});

module.exports = con;