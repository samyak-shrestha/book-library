//list of route
const express = require('express');
const users = require('../controllers/users');
const genres = require('../controllers/genres');
const authors = require('../controllers/authors');
const books = require('../controllers/books');
const error = require('../middlewares/error');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/users', users);
    app.use('/api/genres', genres);
    app.use('/api/authors', authors);
    app.use('/api/books', books);
    app.use(error);
};