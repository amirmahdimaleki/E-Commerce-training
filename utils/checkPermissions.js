const CustomError = require('../errors')
const checkPermissions = (requestUser, resourceUserId) => {
    //         user who sends the req,   the id of the user that the sender wants to see 
    // console.log('requestUser',requestUser)
    // console.log('resourceUserId',resourceUserId)
    // console.log('type',typeof resourceUserId)

    if (requestUser.role === 'admin') return;
    if (requestUser.userId === resourceUserId.toString()) return;
    throw new CustomError.UnauthorizedError(
      'Not authorized to access this route'
    );

}

module.exports = checkPermissions