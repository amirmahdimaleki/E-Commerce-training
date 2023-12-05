const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        statuscode : err.statuscode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || 'Something went wrong, please try again later...'
    }

    if( err.name === 'ValidationError'){
        customError.message = Object.values(err.errors)
        .map((item) => item.message)
        .join(',');
      customError.statuscode = 400;
    }

    if (err.code && err.code === 11000) {
        customError.message = `Duplicate value entered for ${Object.keys(
          err.keyValue
        )} field, please choose another value`;
        customError.statuscode = 400;
      }

      if (err.name === 'CastError') {
        customError.message = `No item found with id : ${err.value}`;
        customError.statuscode = 404;
      }
    
      return res.status(customError.statuscode).json({ message: customError.message });

}

module.exports = errorHandlerMiddleware;