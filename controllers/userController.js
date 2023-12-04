const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {CustomError} = require('../middleware/error-handler')


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
    res.send('current user')

}

const updateUser = async(req, res) => {
    res.send('update users')

}

const updateUserPassword = async(req, res) => {
    res.send('update users password')

}

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}