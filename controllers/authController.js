const register = async (req, res) => {
    res.send('register user')
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