const express = require('express')
const user = require('./userRoutes')
const service = require('./serviceRoutes')

const app = express()

app.use('/user', user)
app.use('/service', service)

module.exports = app
