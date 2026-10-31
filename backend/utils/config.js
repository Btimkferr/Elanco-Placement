require('dotenv').config();

const PORT = process.env.PORT|| 3000;


const DB_HOST = process.env.DB_HOST;
const DB_PASS = process.env.DB_PASS;
const DB_USER = process.env.DB_USER;
const DB_NAME = process.env.DB_NAME;

module.exports = {DB_HOST,DB_PASS,DB_USER,DB_NAME, PORT};