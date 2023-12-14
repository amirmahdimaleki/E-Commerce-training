const {model, Schema} = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'please provide your name'],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true ,
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


//! has to be a function declaration because : this refers to user
UserSchema.pre('save', async function(){
    // if the password is not being changed then don't hash it again
    if(!this.isModified('password')) return 

    const salt = await bcrypt.genSalt(10)
    // this.password is the password in the UserSchema
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}


module.exports = model('User', UserSchema)