const express = require('express')
const app = express()
const port = 4000
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const router = require('./router')
require('./mongoose/connect')

app.use(express.static('public'))
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(cookieParser())

app.use(router)

app.listen(port,()=>{
    console.log('running...')
})