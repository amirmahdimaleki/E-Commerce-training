const {StatusCodes} = require('http-status-codes')
const CustomApiError = require('./custom-api')


class BadRequestError extends CustomApiError{
    constructor(message){
        super(message)
        this.statuscode = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequestError;