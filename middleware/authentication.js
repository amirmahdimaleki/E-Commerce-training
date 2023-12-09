const CustomError = require('../errors')
const {isTokenValid} = require('../utils')

const authenticateUser = async(req, res, next) => {
    console.log("authenticateUser")
    const token = req.signedCookies.token

    if(!token){
        throw new CustomError.UnauthenticatedError('Authentication invalid')
    }

    try {
     const { name, userId, role } = isTokenValid({ token })   
     req.user = { name, userId, role }
     next();
    } catch (err) {
        
    }
}
const authorizePermissions = (...roles) => {

    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        throw new CustomError.UnauthorizedError(
          'Unauthorized to access this route'
        );
      }
        console.log("authorize")
      next();
    };
  };

module.exports = {
    authenticateUser,
    authorizePermissions
}