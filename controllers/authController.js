require('dotenv').config();
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const {createJWT, isTokenValid} = require('../utils')


const register = async (req, res) => {
    const {name, email, password} = req.body;
  
    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      throw new CustomError.BadRequestError('Email already exists');
    }

    // The first user is considered as admin functionality:

    const isFirstUser = await User.countDocuments({}) === 0
    const role = isFirstUser ? 'admin' : 'user'

    const newRegisteredUser = await User.create({name, email, password, role})

    const userTokenPayload = {
        name : newRegisteredUser.name,
        userId : newRegisteredUser._id,
        role : newRegisteredUser.role
    }
    
    const token = createJWT({payload : userTokenPayload})  
  
    res.status(StatusCodes.CREATED).json({newRegisteredUser : userTokenPayload, token})
}

const login = async (req, res) => {
    res.send('user login')
}

const logout = async (req, res) => {
    res.send('user logout')
}


module.exports = {
    register,
    login,
    logout
}