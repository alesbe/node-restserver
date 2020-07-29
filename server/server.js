//config
require('./config/config')

//packets
const express = require('express')
const mongoose = require('mongoose')

//inicialize express
const app = express()

//Middleware
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Import routes
app.use(require('./routes/usuario'))

//db connect (config in config/config.js)
mongoose.connect(process.env.URL_DB, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err, res) => {
        if (err) throw err;
        console.log('Base de datos corriendo en el puerto 27017');
    });

//listen port
app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
})