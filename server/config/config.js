/* CONFIGURACIONES PARA LAS CONEXIONES */

/* VARIABLES GLOBALES - PROCESS */

// ===========================
// Puerto
// ===========================

process.env.PORT = process.env.PORT || 3000;

// ===========================
// Entorno
// ===========================

process.env.NODE_ENV = process.env.NODE_ENV || 'DEV';

// ===========================
// Base de datos
// ===========================

let URL;
if (process.env.NODE_ENV === 'DEV') {
    URL = 'mongodb://localhost:27017/cafe';
} else {
    /* URL: MONGO ATLAS / MLAB */
    URL = 'mongodb+srv://nicolas_rm:c267308bad@cluster0-bhq98.mongodb.net/cafe';
}

process.env.URL_DB = URL;