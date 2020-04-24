//list of route
const express = require('express');
const genres = require('../controllers/genres');
const users = require('../controllers/users');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/genres', genres);
    app.use('/api/users', users);
};