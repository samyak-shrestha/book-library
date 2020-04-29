const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function() {
    const dbconfig = 'mongodb://localhost/bookLibrary';
    
    mongoose.connect(dbconfig)
        .then(()=> winston.info(`Connected to ${dbconfig}...`));

};
