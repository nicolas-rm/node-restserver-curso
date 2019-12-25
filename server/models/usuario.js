/* MODELO DE DATOS ES UNA TABLA CON SUS ATRIBUTOS EN ESTOS CASOS LOS ATRIBUTOS SON LAS PROPIEDADES DEL ARCHIVO JSON */

/* SE REQUIERE MONGOOSE */
const mongoose = require('mongoose');

/* SE REQUIERE EL VALIDADOR PERSONALIZADO Y AUTOMATIZADO */
const uniqueValidator = require('mongoose-unique-validator');


/* VALIDACIONES PERSONALIZADAS */
/* VALORES PREDEFINIDOS */

let rolesValidos = {
    values: ['ADMIN_ROLES', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};


/* CREACION AUTOMATICA DEL ESQUEMA DE MONGOOSE */
let Schema = mongoose.Schema;

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
        default: 'USER_ROLE',
        /* PROPIEDAD PARA VALIDAR */
        enum: rolesValidos
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


usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });
/* PARAMETROS: NOMBRE DEL ESQUEMA, CONFIGURACIONES DEL ESQUEMA */
module.exports = mongoose.model('Usuario', usuarioSchema);