//config
require('./config/config')

//packets
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')

//inicialize express
const app = express()

//Body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// habilitar la carpeta public
//usamos path para crear la ruta correcta, si no, será literlamente "07-restserver/server../public", y queremos "07-restserver/public"
app.use(express.static(path.resolve(__dirname, '../public')));

//Import routes (en index esta la configuracion global de rutas)
app.use(require('./routes/index'))

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