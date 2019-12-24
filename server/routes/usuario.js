/* IMPORTACION DE EXPRES */
const express = require('express');
const app = express();


/* IMPORTANDO EL ESQUEMA DE USUARIOS */
const Usuario = require('../models/usuario');

/* PETICIONES GET - LEER*/
app.get('/', function(req, res) {
    res.json('GET - HOLA MUNDO');
});


app.get('/usuario', function(req, res) {
    res.json('GET - USUARIO');
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

app.post('/usuario', function(req, res) {

    /* BODY CUANDO SE ENVIA POR X-WWW-FORM-URLENCODED - BODY-PARSE*/
    let body = req.body;


    /* UTILIZACION DEL ESQUEMA DE USUARIOS */
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
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
app.put('/usuario/:id', function(req, res) {
    /* 
     ** req: requerir lo que se envia 
     ** params: parametros
     ** :X : nombre del parametro
     */
    let id = req.params.id;
    res.json({
        peticion: 'PUT - USUARIO - ID',
        id: id
    });

});


/* PETICIONES DELETE - ELIMINAR*/
app.delete('/usuario', function(req, res) {
    res.json('DELETE - USUARIO');
});


/* PARA EXPORTAR TODAS LAS CONFIGURACIONES GUARDADAS */
module.exports = app;