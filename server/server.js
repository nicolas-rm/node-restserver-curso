/* CONFIGURACIONES GLOBALES */
require('./config/config');


/* IMPORTACION DE MONGOOSE */
const mongoose = require('mongoose');
// mongoose.set('useUnifiedTopologyuseUnifiedTopology', true);
// mongoose.set('useUnifiedTopology', true);
// mongoose.set('useNewUrlParser', true);
// useUnifiedTopology:
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

/* FUTUROS CAMBIOS EN LAS CONEXIONES */
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);


mongoose.connect('mongodb://localhost:27017/cafe', (err, res) => {
    if (err) throw err;

    console.log('\n');
    console.log(`******* Mongodb Conectado *******`);
});
// mongoose.set('useCreateIndex', true);

app.listen(PORT, () => {
    console.log('\n');
    console.log(`******* Server Express En El Puerto: ${PORT} *******`);
    console.log('\n');
});