const Joi = require('joi');
const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlenth: 3,
        maxlength: 50
    }
});

const Author = mongoose.model('Author', authorSchema);

function validateAuthor(author){
    const schema = {
        title: Joi.string().min(3).max(50).required()
    };
    
    return Joi.validate(author, schema);
}

exports.Author = Author;
exports.authorSchema = authorSchema;
exports.validateAuthor = validateAuthor;