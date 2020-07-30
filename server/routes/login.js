const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario')

const app = express()

app.get('/login', (req, res) => {
    let body = req.body;

    // Comprobamos si el email existe
    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        // Si existe un error, status 500 (Internal server error)
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        // Si el usuario (correo) no existe, status 400 (Bad request)
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario) o contraseña incorrectos'
                }
            });
        }

        /* Como la contraseña está encriptada de forma sincrona 10 vueltas, bcrypt trae una función
        que encripta la contraseña del body directamente, y la compara con la de la DB. Si coincide,
        devolverá true.

        NOTA: Estamos usando un ! en el if, por lo que solo va a entrar al if si la funcion devuelve false
        es decir, si las contraseñas no coinciden.
        */
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (contraseña) incorrectos'
                }
            });
        }

        // Genera un nuevo token para el usuario que ha hecho login, con los datos del usuario.
        // Este le servirá para acceder a los get usuario por ejemplo.
        // El payload guardará todos sus datos, y será usado cada vez que intente acceder a una página restringida pasando por el middleware autenticacion
        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        })
    })

})

module.exports = app;