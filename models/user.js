const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    middleName: {
        type: String,
        required: false,
        minlength: 3,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean
});

const User = mongoose.model('User', userSchema);

function validateUser(user){
    const schema = {
        firstName: Joi.string().min(3).max(50).required(),
        middleName: Joi.string().min(3).max(50),
        lastName: Joi.string().min(3).max(50),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    }

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validateUser = validateUser;