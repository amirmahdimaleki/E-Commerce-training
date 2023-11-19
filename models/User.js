const {model, Schema} = require('mongoose')
const validator = require('validator')

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'please provide your name'],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'please provide an email'],
        validate: {
            validator : validator.isEmail ,
            message: "please provide a valid email"
        }
    },
    password: {
        type: String,
        required: [true, 'please provide a password'],
        minlength: 6
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }

})

module.exports = model('User', UserSchema)