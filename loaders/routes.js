//list of route
const express = require('express');
const genres = require('../controllers/genres');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/genres', genres);
};