const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://matiasjuncos:matijuncosmongodb@cluster0.yacsb.mongodb.net/mytineraries?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}) //parametros: dirección a la que me voy a conectar y cambiar el password y nombre de dbase y el segudno param es un objetos q esta en el cuaderno
