const winston = require('winston');
const express = require('express')
const app = express();

require('./loaders/logging')();
require('./loaders/routes')(app);
require('./loaders/db')();
require('./loaders/validation')();

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>  winston.info(`Listening at port ${port} ...`) );

module.exports = server;