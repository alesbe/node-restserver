const express = require('express')
const bcrypt = require('bcrypt')
const _ = require('underscore')

const Usuario = require('../models/usuario')
const { verificaToken, verificaAdmin_Rol } = require('../middlewares/autenticacion')

const app = express()

/*Devuelve una lista de usuarios, desde el usuario x pasado por la query
hasta 5 usuarios mas, si no pasamos nada en la query, será desde el usuario 0.
Con find buscamos todos los usuarios, porque no le pasamos ningun parametro de busqueda
skip = desde, limit = hasta, para entenderlo mejor.

Pasamos nuestro middleware para verificar el token, y que un usuario que no haya
hecho login pueda acceder a esta ruta.
*/
app.get('/usuario', verificaToken, (req, res) => {
    // Tomar los usuarios desde la query, si no hay, desde 0
    let desde = req.query.desde || 0;
    desde = Number(desde)

    // Tomar los usuarios desde "desde" hasta limite
    let limite = req.query.limite || 5;
    limite = Number(limite)

    // Busca los usuarios activos desde 'desde', hasta 'hasta' y los muestra, Indicamos que solo nos devuelva los campos nombre, email y role
    Usuario.find({ estado: true }, 'nombre email role')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            // Cuando se ejecuta el find, podemos poner lo que queramos en el callback, en este caso, un conteo total de usuarios activos
            Usuario.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    conteo
                })
            })
        });
})

// Mostrar un usuario por ID
app.get('/usuario/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario
        })
    })
})

/*Crea un nuevo usuario, con los parametros del body,
los pone en el modelo, y los guarda en la db con save,
y devuelve una respuesta json si ha ido bien con el nuevo
usuario.

Nota: El nombre del documento se crea con el nombre del modelo en
lowercase y con s al final, ejemplo Dog => dogs
*/
app.post('/usuario', [verificaToken, verificaAdmin_Rol], (req, res) => {
    let body = req.body;

    // Creamos un nuevo objeto con el modelo Usuario
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    // Guardamos el registro
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // Si se ha hecho correctamente, mostramos el nuevo usuario
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
})

/*Busca un usuario en el documento con el mismo nombre del modelo en lowercase
y con s (usuarios), y actualiza el contenido con la información pasada en el
body. El método pick limita el cambio a nombre, email, img, y estado, para que
no se pueda cambiar ni el campo google, password, y rol
*/
app.put('/usuario/:id', [verificaToken, verificaAdmin_Rol], (req, res) => {
    let id = req.params.id;

    //Selecciono los parametros del body que si se pueden actualizar, excluyendo google, password y role
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'estado']);

    // Busca un registro con la id que le hemos pasado en los params, le pasamos los nuevos datos por el body, con new obtendremos la respuesta del usuario actualizado,
    // y con runValidators activaremos las validaciones especificadas en el schema Usuario.
    // Modelo.findByIdAndUpdate(busca y encuentra el documento a actualizar, nuevos datos del documento, {muestrame la informacion actualizada para el json, corre las validaciones del scheme}, callback)
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
})

/*Busca un usuario en la DB con la id indicada en la query, y la cambia el estado a false. Esto se hace porque hoy en día no se suelen eliminar los registros directamente, sino que se 
le cambia el estado. Por ejemplo, en un almacen, igual nos interesa guardar los datos del producto, como las ventas o la demanda, pero como no nos queda, no queremos tenerlo activo.

Nota: El código comentado es como se haría eliminando directamente documento
*/
app.delete('/usuario/:id', [verificaToken, verificaAdmin_Rol], (req, res) => {
    let id = req.params.id;

    /*
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (usuarioBorrado === null) {
            return res.status(404).json({
                ok: false,
                err: {
                    messasge: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuarioBorrado
        })
    })*/

    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        })
    })
})

module.exports = app;