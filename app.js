require('dotenv').config();
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

// * routers
const authRouter = require('./routes/authRoutes')

// * middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
// not found middleware is on top because we don't need to handle error its just not found
// and error handler middleware is the last middleware(based on express rules) because we can access it once the route is hit(its successful and it might have errors then we'll handle it)

app.use(express.json())
app.use(morgan('tiny'))

app.get('/', (req, res) => {
    res.send("hi")
})

app.use('/api/v1/auth', authRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)



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