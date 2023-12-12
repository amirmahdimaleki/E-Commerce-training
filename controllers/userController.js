const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const { createTokenUser, attachCookiesToResponse } = require('../utils');


const getAllUsers = async(req, res) => {
    // ^                                    removes pass from response
    const users = await User.find({role : 'user'}).select('-password')
    res.status(StatusCodes.OK).json({ users })
}

const getSingleUser = async(req, res) => {
    const user = await User.findOne({_id : req.params.id}).select('-password')
    if(!user){
        throw new CustomError.NotFoundError(`No user with the id of ${req.params.id} found`)
    }
    res.status(StatusCodes.OK).json({ user })
}

const showCurrentUser = async(req, res) => {
   res.status(StatusCodes.OK).json({user: req.user})
}

const updateUser = async(req, res) => { 
    const {email, name} = req.body
    
    if(!email || !name ){
        throw new CustomError.BadRequestError('provide email and name, you numb nuts')
    }
    // & ====================== CONTINUE WITH THE 36th VIDEO WITHOUT findByIdAndUpdate ================
    const user = await User.findByIdAndUpdate 

    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({res, user:tokenUser})
    res.status(StatusCodes.OK).json({user : tokenUser})
}

const updateUserPassword = async(req, res) => {
    const {oldPassword, newPassword} = req.body
    if(!oldPassword || !newPassword){
        throw new CustomError.BadRequestError('Provide both new and old passwords, you idiot')
    }
    const user = await User.findOne({ _id : req.user.userId })

    const isPasswordCorrect = await user.comparePassword(oldPassword)
    if(!isPasswordCorrect){
        throw new CustomError.UnauthenticatedError('invalid credentials')
    }
    user.password = newPassword

    await user.save()
    res.status(StatusCodes.OK).json({ message : 'password successfully updated' })
}

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}