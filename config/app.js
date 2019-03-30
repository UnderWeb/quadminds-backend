'use strict';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

// Carga de rutas.
const note_routes = require('../routes/note.route');

app.use(bodyParser.urlencoded({extended: false}));

// Convierte lo que trae el body a json.
app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-Width, Content-Type, Accept, Access-Control-Allow-Request-Method');
    response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    response.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Rutas base * (api es prefijo).
app.use('/api', note_routes);

// Exportación del módulo.
module.exports = app;
