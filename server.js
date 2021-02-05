const express = require('express')
require('dotenv').config()

const cors = require('cors') //para que se pueda consumir
const router = require('./routes/index')
require('./config/database')
const app =express()



//MIDDLEWARE
app.use(cors()) //evito bloqueos para consumo de api
app.use(express.json()) //formato de archivos



app.use('/api', router) //sila ruta es api, escucha a router q esta en index.js

//Levanto servidor

app.listen(4000, ()=> console.log('App listening on PORT 4000'))
