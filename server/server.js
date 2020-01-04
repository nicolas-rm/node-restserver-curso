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


mongoose.connect(process.env.URL_DB, (err, res) => {
    if (err) throw err;

    console.log('\x1b[32m ==> BASE DE DATOS MONGO:\x1b[0m \x1b[33m%s\x1b[0m', 'ONLINE');
    console.log('\n');
    console.log('\x1b[4m_________________________________\x1b[0m');

});

app.listen(PORT, () => {
    console.log('\n');
    console.log('\x1b[4m_________________________________\x1b[0m');
    console.log('\n');
    console.log('\x1b[32m ==> SERVER EXPRESS:\x1b[0m \x1b[33m%s\x1b[0m', 'ONLINE');
    console.log('\x1b[32m ==> puerto express:\x1b[0m \x1b[33m%s\x1b[0m', `${PORT}`);
    console.log('\n');
});

/*
Colores para la consola
Reset = "\x1b[0m"

Bright = "\x1b[1m"

Dim = "\x1b[2m"

Underscore = "\x1b[4m"

Blink = "\x1b[5m"

Reverse = "\x1b[7m"

Hidden = "\x1b[8m"

FgBlack = "\x1b[30m"

FgRed = "\x1b[31m"

FgGreen = "\x1b[32m"

FgYellow = "\x1b[33m"

FgBlue = "\x1b[34m"

FgMagenta = "\x1b[35m"

FgCyan = "\x1b[36m"

FgWhite = "\x1b[37m"

BgBlack = "\x1b[40m"

BgRed = "\x1b[41m"

BgGreen = "\x1b[42m"

BgYellow = "\x1b[43m"

BgBlue = "\x1b[44m"

BgMagenta = "\x1b[45m"

BgCyan = "\x1b[46m"

BgWhite = "\x1b[47m"



Ejemplo:
console.log('Node/Express: \x1b[36m%s\x1b[0m', 'online');

*/