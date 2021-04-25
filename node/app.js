const express = require('express')
const app = express()
const router = require('./routers/api')
const bodyParser = require('body-parser')
const nodemon = require('nodemon')
const env = require('dotenv')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
env.config()
app.use(bodyParser.json())
const cors = require('cors')
app.use(cors())

function check(req, res, next) {
    try {
        if (req.originalUrl.includes('api'))
            return next()
        console.log("headers::::", req.headers['authorization'])
        const parameters = jwt.verify(req.headers['authorization'], process.env.SECRET)
        return next()
    } catch (error) {
        console.log("error")
        res.status(500).send('not good passward in header')
    }
}

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.DB_CONNECT, connectionParams).then(
    () => { console.log('connect') }
).catch((err) => { console.log(err) })

console.log("createing")
//   app.use('/',check)
app.use('/',check, router)
app.listen(3001, () => {
    console.log('listing')
})