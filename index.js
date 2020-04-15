const express = require('express')
const app = express()
const port = 3000

require('./loaders/routes')(app);
require('./loaders/db')();

const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});

module.exports = server;