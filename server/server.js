const express = require('express');
require('dotenv').config()
const dbconnect = require('./config/dbconnect')
const initRoutes = require('./routes/index')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL.split(','),
    methods:['POST', 'PUT', 'GET', 'DELETE'],
    credentials:true
}))
app.use(cookieParser())
const port = process.env.PORT || 8888

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

dbconnect()
initRoutes(app)

app.use('/', (req,res) => {res.send('server on')})

app.listen(port, () => {
    console.log('server running on the port: '+ port)
})