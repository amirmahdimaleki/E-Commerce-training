// require('dotenv').config();
require('express-async-errors');

// * express
const express = require('express')
const app = express()

// * packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');


//* database
const connectDB = require('./db/connect');


// * start server
const port = process.env.PORT || 5000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen( port, () => console.log( `server started on port${port} ...🚀`))
    } catch (error) {
        console.log(error)
    }
}

start()
