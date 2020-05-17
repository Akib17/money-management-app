const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const connection = require('./Connection')
const passport = require('passport')

const userRouter = require('./route/userRoute')
const transactionRouter = require('./route/transactionRoutes')

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(passport.initialize())
require('./passport')(passport)

// Mongo Connection
app.set(connection)

// Route for user
app.use('/api/users', userRouter)
// Route for transactions
// Desc: /api/transaction
app.use('/api/transaction', transactionRouter)

// @route: '/'
// Desc: Home route
app.get("/", (req, res) => {
    res.send('Thanks for calling me')
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})