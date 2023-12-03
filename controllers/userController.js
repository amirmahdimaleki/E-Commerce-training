const getAllUsers = async(req, res) => {
    res.send('all users')
}

const getSingleUser = async(req, res) => {
    res.send('one users')

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