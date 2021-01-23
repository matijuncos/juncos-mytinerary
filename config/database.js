const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}) //parametros: dirección a la que me voy a conectar y cambiar el password y nombre de dbase y el segudno param es un objetos q esta en el cuaderno
