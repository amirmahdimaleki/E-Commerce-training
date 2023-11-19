const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')


const register = async (req, res) => {
    const { email, name, password } = req.body;
  
    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      throw new CustomError.BadRequestError('Email already exists');
    }

    const newRegisteredUser = await User.create(req.body)
    res.status(StatusCodes.CREATED).send({newRegisteredUser})
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