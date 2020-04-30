const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genre');
const { authorSchema } = require('./author');

//add -> tags and publishers
const Book = mongoose.model('Books', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    author: {
        type: authorSchema,
        required: true
    },
    isbn: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024
    }
}));

function validateBook(book){
    const schema = {
        title: Joi.string().min(3).max(255).required(),
        genreId: Joi.objectId().required(),
        authorId: Joi.objectId().required(),
        isbn: Joi.string().min(3).max(50).required()
    }
    return Joi.validate(book, schema);
};

exports.Book = Book;
exports.validateBook = validateBook;