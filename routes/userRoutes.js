const express = require('express')
const router = express.Router()


const {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
} = require('../controllers/userController.js')

//!  THE ORDER IS SUPER IMPORTANT ; otherwise if the /showMe is put after the /:id , it will be treated as an id, not a separate routes

router.route('/').get(getAllUsers)

router.route('/showMe').get(showCurrentUser)

router.route('/updateUser').patch(updateUser)

router.route('/updateUserPassword').patch(updateUserPassword)

router.route('/:id').get(getSingleUser)


module.exports = router 