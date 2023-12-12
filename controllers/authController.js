require('dotenv').config();
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const { attachCookiesToResponse, createTokenUser } = require('../utils')


const register = async (req, res) => {
    const {name, email, password} = req.body;
  
    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      throw new CustomError.BadRequestError('Email already exists');
    }

    // The first user is considered as admin functionality:

    const isFirstAccount = await User.countDocuments({}) === 0
    const role = isFirstAccount ? 'admin' : 'user'

    const newRegisteredUser = await User.create({name, email, password, role})

    const userTokenPayload = createTokenUser(newRegisteredUser)
    attachCookiesToResponse({res, user: userTokenPayload})

    res.status(StatusCodes.OK).json({ user: userTokenPayload });
}

const login = async (req, res) => {

    const {email, password} = req.body
    if(!email || !password){
        throw new CustomError.BadRequestError('Provide password and email you idiot')
    }

    const user = await User.findOne({ email })
    if(!user){
        throw new CustomError.UnauthenticatedError('Invalid credentials dumb ass')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError("Invalid credentials dumb ass")
    }

    const userTokenPayload = createTokenUser(user)
    attachCookiesToResponse({res, user: userTokenPayload})

    res.status(StatusCodes.CREATED).json({ user: userTokenPayload });
}

const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 4 * 1000)
    })
    res.status(StatusCodes.OK).json({message: 'Logged out the user'})
}


module.exports = {
    register,
    login,
    logout
}