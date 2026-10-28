const express = require('express');
const mysql = require('mysql2/promise');
const config = require('./utils/config');
const fs = require('fs');
const sightingRouter = require('./controllers/user/sightings');

const app = express();

app.use(express.json())

app.use('/api/sightings', sightingRouter);

module.exports = app;