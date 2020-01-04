/* IMPORTACION DE EXPRES */
const express = require('express');

/* ENCRIPTADOR DE UNA SOLA VIA, BCRYPT */
const bcrypt = require('bcrypt');


/* FILTRADOR PARA ELIMINAR CAMPOS AL MOMENTO DE EDITAR */
const _ = require('underscore');

const app = express();


/* IMPORTANDO EL ESQUEMA DE USUARIOS */
const Usuario = require('../models/usuario');

/* PETICIONES GET - LEER*/
app.get('/', function(req, res) {
    res.json('GET - HOLA MUNDO');
});


app.get('/usuario', function(req, res) {

    /* PAGINACION (OPCIONAL) skip */
    let desde = req.query.desde || 0;
    desde = Number(desde);

    /* LIMITE CANTIDAD DE DATOS POR PAGINA (limit)*/
    let limite = req.query.limite || 5;
    limite = Number(limite);

    /* FILTRO DE CONDICIONES DE MOONGOOSE */
    /* DEBE DE IR LOS ATRIBUTOS DE LA COLECCION */
    /* google: true */


    let condiciones = {
        estado: true
    };
    /* skip() : para mostrar de 5 en 5 los datos, limit: limite de datos por paginacion  */

    /* FILTRO DE CAMPOS EN LA PETICION GET */
    /* SON LOS CAMPOS DE LA RESPECTIVA COLECCION */
    let campos = 'nombre email role estado google img';


    Usuario.find(condiciones, campos)
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }


            /* CUANTA LA CANTIDAD DE DOCUMENTOS O DE REGISTROS QUE ESTA DEVOLVIENDO */
            Usuario.countDocuments(condiciones, (err, conteo) => {

                res.status(200).json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });

            });

            // res.status(200).json({
            //     ok: true,
            //     mensaje: 'GET - USUARIO',
            //     usuarios: usuarios
            // });

        });
    // res.json('GET - USUARIO');
});


/* PETICIONES POST - AGREGAR*/
// app.post('/usuario', function(req, res) {

//     /* BODY CUANDO SE ENVIA POR X-WWW-FORM-URLENCODED - BODY-PARSE*/
//     let body = req.body;

//     /* RESPUES ENCODE - RESPUESTAS DE LA WEB */
//     if (body.nombre === undefined) {
//         /* RESPUESTA ENCODE - SIRVE PARA INDENTIFICAR 
//         QUE PASO EN LA WEB */
//         res.status(400).json({
//             ok: false,
//             mensaje: 'El nombre es necesario'
//         });
//     } else {
//         res.json({
//             peticion: 'POST - USUARIO - ID - X-WWW-FORM-URLENCODED',
//             body: body
//         });
//     }
// });


/* FUNCION DE CUANDO SE ENVIA POR X-WWW-FORM-URLENCODED - BODY-PARSE*/
/* METODO POST - AGREGAR / AÑADIR */
app.post('/usuario', function(req, res) {

    /* BODY CUANDO SE ENVIA POR X-WWW-FORM-URLENCODED - BODY-PARSE*/
    let body = req.body;


    /* UTILIZACION DEL ESQUEMA DE USUARIOS */
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuariodb) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuariodb
        });
    });
});


/* PETICIONES PUT - ACTUALIZAR*/
app.put('/usuario', function(req, res) {
    res.json('PUT - USUARIO');
});

/* PETICIONES PUT CON ID */
/* EDITAR / ACTUALIZAR */
app.put('/usuario/:id', function(req, res) {
    /* 
     ** req: requerir lo que se envia 
     ** params: parametros
     ** res: respuesta
     ** :X : nombre del parametro
     */

    /* ACTUALIZAR UN REGISTRO FORMA 1*/
    /* let id = req.params.id;
    let body = req.body; */

    /* ACTUALIZAR UN REGISTRO FORMA 2*/
    let id = req.params.id;
    /* EL _.pick: para filtrar que es lo que se va a editar, datos para filtrar del esquema de usuario */
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);



    /* FORMA 1 DE INHABILITAR LOS DATOS CUANDO NO SE DEBEN DE EDITAR*/

    /* delete body.password;
    delete body.google; */

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuariodb) => {


        /* RESPUESTA DE ERROR */
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        /* RESPUESTA CORRECTA */
        res.status(200).json({
            ok: true,
            peticion: 'USUARIO ACTUALIZADO - ID',
            usuario: usuariodb
        });
    });


});


/* PETICIONES DELETE - ELIMINAR*/
app.delete('/usuario/:id', function(req, res) {
    // res.json('DELETE - USUARIO');
    let id = req.params.id;

    /* ELIMINACION FISICA (DE LA BASE DE DATOS) */
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    //     /* SI SE GENERA UN ERROR */
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err: err
    //         });
    //     }

    //     /* SI EL USUARIO NO ESTA */
    //     if (!usuarioBorrado) {
    //         return res.status(400).json({
    //             ok: true,
    //             err: {
    //                 mensaje: 'USUARIO NO ENCONTRADO'
    //             }
    //         });
    //     }

    //     res.status(200).json({
    //         ok: true,
    //         usuario: usuarioBorrado
    //     });
    // });

    /* DATO DIRECTO DEL ESTADO */
    let estado = {
        estado: false
    };


    /* ELIMINACION DE ESTADO (DE LA BASE DE DATOS) */
    Usuario.findByIdAndUpdate(id, estado, { new: true, runValidators: true }, (err, usuarioBorrado) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err: err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    mensaje: 'USUARIO NO ENCONTRADO'
                }
            });
        }

        res.status(400).json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});


/* PARA EXPORTAR TODAS LAS CONFIGURACIONES GUARDADAS */
module.exports = app;