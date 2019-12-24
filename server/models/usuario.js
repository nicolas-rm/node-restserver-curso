/* MODELO DE DATOS ES UNA TABLA CON SUS ATRIBUTOS EN ESTOS CASOS LOS ATRIBUTOS SON LAS PROPIEDADES DEL ARCHIVO JSON */

/* SE REQUIERE MONGOOSE */

const mongoose = require('mongoose');

let Schema = mongoose.Schema;

/* CREACION AUTOMATICA DEL ESQUEMA DE MONGOOSE */

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, '****** El nombre es necesario ******']
    },
    email: {
        type: String,
        unique: true,
        required: [true, '****** El Correo es necesario ******']

    },
    password: {
        type: String,
        required: [true, '****** El password es necesario ******']
    },
    img: {
        type: String,
        required: [false]
    },
    role: {
        type: String,
        default: 'USER_ROLE'
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

/* PARAMETROS: NOMBRE DEL ESQUEMA, CONFIGURACIONES DEL ESQUEMA */
module.exports = mongoose.model('Usuario', usuarioSchema);