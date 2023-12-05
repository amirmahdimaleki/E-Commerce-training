const express = require('express')
const router = express.Router()
const authenticateUser = require('../middleware/authentication.js')


const {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
} = require('../controllers/userController.js')

//!  THE ORDER IS SUPER IMPORTANT ; otherwise if the /showMe is put after the /:id , it will be treated as an id, not a separate routes

//? this authentication could be implemented in app js like this:
//? app.use('/api/v1/users', authenticateUser, userRouter)

router.route('/').get(authenticateUser, getAllUsers)

router.route('/showMe').get(showCurrentUser)

router.route('/updateUser').patch(updateUser)

router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword)

router.route('/:id').get(getSingleUser)


module.exports = router 