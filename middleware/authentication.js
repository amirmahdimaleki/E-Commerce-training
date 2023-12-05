const CustomError = require('../errors')
const {isTokenValid} = require('../utils')

const authenticateUser = async(req, res, next) => {
    const token = req.signedCookies.token

    if(!token){
        console.log("No token")
        // throw new CustomError.UnauthenticatedError('token does not exist')
    }else{

        //  res.send('token is there')
        console.log("token")
    }

     next()
}

module.exports = {
    authenticateUser
}