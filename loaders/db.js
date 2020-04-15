const mongoose = require('mongoose');

module.exports = function() {
    const dbconfig = 'mongodb://localhost/bookLibrary';
    
    mongoose.connect(dbconfig)
        .then(()=> console.log('DB Connected successfully'));

};
