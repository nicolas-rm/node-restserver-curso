/* CONFIGURACIONES GLOBALES */
require('./config/config');


/* IMPORTACION DE MONGOOSE */
const mongoose = require('mongoose');

/* IMPORTACION DE EXPRES */
const express = require('express');
const app = express();

/* IMPORTACION DEL BODY - PARSE  */
/* BODY-PARSE: SIRVE PARA LEER EL PAYLOAD O PETICIONES X-WWW-FORM-URLENCODED*/
const bodyParse = require('body-parser');

/* PROCESAR PETICIONES X-WWW-FORM-URLENCODED */
/* ESTE midleware FUNCIONA DE LA MISMA MANERA PARA TODAS LAS PETICIONES */
/* NOTA: CADA VEZ QUE SE USE: app.use() es un midleware */
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

app.use(require('./routes/usuario'));


/* PUERTO DEL SERVIDOR EXPRESS*/
const PORT = process.env.PORT;


/* CONEXION A MONGODB */
mongoose.connect('mongodb://localhost:27017/cafe', (err, res) => {
    if (err) throw err;
    console.log('\n');
    console.log(`******* Mongodb Conectado *******`);
});


app.listen(PORT, () => {
    console.log('\n');
    console.log(`******* Server Express En El Puerto: ${PORT} *******`);
});