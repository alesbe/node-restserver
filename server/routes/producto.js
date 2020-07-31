const express = require('express');
const { verificaToken, verificaAdmin_Rol } = require('../middlewares/autenticacion')

let app = express()
let Producto = require('../models/producto');
const producto = require('../models/producto');

// Obtener todos los productos
app.get('/producto', verificaToken, (req, res) => {
    let desde = req.params.desde;
    let limite = req.params.limite;

    Producto.find({ disponible: true })
        .sort('descripcion')
        .populate('usuario', 'categoria')
        .skip(desde)
        .limit(limite)
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productoDB) {
                return res.status(500).json({
                    ok: false,
                    message: 'No se han encontrado productos'
                });
            }

            res.json({
                ok: true,
                productoDB
            })
        })
})

//Obtener producto por id
app.get('/producto/:id', verificaToken, (req, res) => {
        let id = req.params.id;
        Producto.findById(id)
            .populate('usuario', 'categoria')
            .exec((err, productoDB) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                if (!productoDB) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Producto no encontrado'
                    });
                }

                res.json({
                    ok: true,
                    productoDB
                })
            })
    })
    //Buscar productos
    //Que estén disponibles
    //Con una regex podemos buscar por ejemplo 'Ensal' para que nos salgan todos los productos
    //que contengan 'Ensal', por ejemplo, Ensalada César, Ensalada de la casa, etc
app.get('/producto/buscar/:termino', verificaToken, (req, res) => {
    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex, disponible: true })
        .populate('usuario', 'categoria')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productoDB
            })
        })
})

//Crear un producto
app.post('/producto', verificaToken, (req, res) => {
    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        categoria: body.categoria,
        usuario: req.usuario._id
    })

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            productoDB
        })
    })
})

//Actualizar un producto
app.put('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    let body = req.body;

    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                message: 'Producto no encontrado'
            });
        }

        //Como no sabemos que productos quiere actualizar, comprobamos
        //que no estén vacíos y los pasamos

        if (body.nombre) {
            productoDB.nombre = body.nombre
        }
        if (body.precioUni) {
            productoDB.precioUni = body.precioUni
        }
        if (body.descripcion) {
            productoDB.descripcion = body.descripcion
        }
        if (body.categoria) {
            productoDB.categoria = body.categoria
        }

        productoDB.save((err, productoGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productoGuardado
            })
        })
    })
})

//Borrar un producto (cambiar el estado)
app.delete('/producto/:id', [verificaToken, verificaAdmin_Rol], (req, res) => {
    let id = req.params.id;

    Producto.findByIdAndUpdate(id, { disponible: false }, { new: true }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                message: 'Producto no encontrado'
            });
        }

        res.json({
            ok: true,
            productoDB,
            message: 'Producto desactivado'
        })
    })
})

//Reactivar un producto (cambiar el estado)
app.patch('/producto/:id', [verificaToken, verificaAdmin_Rol], (req, res) => {
    let id = req.params.id;

    Producto.findByIdAndUpdate(id, { disponible: true }, { new: true }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                message: 'Producto no encontrado'
            });
        }

        res.json({
            ok: true,
            productoDB,
            message: 'Producto habilitado'
        })
    })
})

module.exports = app;