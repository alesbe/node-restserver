// **************
// *   PUERTO   *
// **************
process.env.PORT = process.env.PORT || 3000;

// ***************
// *   ENTORNO   *
// ***************

// NODE_ENV: Variable de entorno que usa heroku. Si existe, es que estamos en producción, si no, estamos en desarrollo
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// *****************************
// *   VENCIMIENTO DEL TOKEN   *
// *****************************

process.env.CADUCIDAD_TOKEN = '30d';

// ***************************************
// *   SEED DE AUTENTICACIÓN DEL TOKEN   *
// ***************************************

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo'

// ****************
// *   DATABASE   *
// ****************

let urlDB;

if (process.env.NODE_ENV === 'development') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URL_DB = urlDB;

// ************************
// *   GOOGLE CLIENT ID   *
// ************************
process.env.CLIENT_ID = process.env.CLIENT_ID || '940787615706-d6jptr4isllnkp69v4catih6l0oqfdr7.apps.googleusercontent.com';