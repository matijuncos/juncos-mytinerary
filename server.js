const express = require('express')
const path = require('path')

const cors = require('cors') //para que se pueda consumir
require('dotenv').config()
const router = require('./routes/index')
require('./config/database')
const app =express()

//MIDDLEWARE
app.use(cors()) //evito bloqueos para consumo de api
app.use(express.json()) //formato de archivos


app.use('/api', router) //sila ruta es api, escucha a router q esta en index.js

//Levanto servidor
const port = process.env.PORT || 4000
const host = process.env.HOST || '0.0.0.0'

app.listen(port, host, ()=> console.log('App listening on PORT 4000'))
