const jwt = require('jsonwebtoken')


const createJWT = ({ payload }) => {
    const token = jwt.sign(
          //  this token contains : payload ------- jwt secret ----- options
         payload,
         process.env.JWT_SECRET,
         {expiresIn : process.env.JWT_LIFETIME}
         )
         return token
}

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET)


const attachCookiesToResponse = ({res, user}) => {
  const token = createJWT({payload : user})

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() +  1000 * 60 * 60 * 24), // one day
    secure: process.env.NODE_ENV === 'production',
    // make a signedCookie: 
    signed: true
 })
}


module.exports = {
    createJWT,
    isTokenValid,
    attachCookiesToResponse
}