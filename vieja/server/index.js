// Esta es la forma common js de utilizar una dependencia
// Importa express y lo asigna a una variable
//const express = require('express');

// Esta es la forma con sintaxis imports y exports para utilizar una dependencia
import express from 'express';
// si haces este paso te saltará un error, que un statement no puede funcionar fuera de un módulo, para que funcione correctamente se debe crear en el package.json el "type": "module"

// en la nueva versión de node, debes colocar la extensión del archivo importado
import router from './routes/index.js';
import db from './config/db.js';
// ------------------------------------------

import dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });

// Contiene una función para ejecutar express y se almacena en una variable
const app = express();

// Conecatr a base de datos
db.authenticate()
     .then(() => console.log('Base de datos conectada'))
     .catch( error => console.log(error));

// Definir puerto
// process.env.PORT es una variable de entorno, dónde node establece cual puerto usará, se asignará usualmente dónde se haga el deployment, como no se sabe cual puerto estará disponible, este lo asignará automáticamente.
// Si trabajamos en local, la variable de entorno no existirá y por lo tanto se usará el puerto 4000, una vez se haga el deployment la variable de entorno si existirá.
const port = process.env.PORT || 4000;

// Habilitar PUG
app.set('view engine', 'pug');

// Obtener al año actual
app.use((req, res, next) => {
     // Así se pasan valores de un archivo hacia una vista, usando locals, perteneciente al objeto res(response). Le podemos asignar otro atributo como por ejemplo .actualYear
     //res.locals.actualYear = year.getFullYear();
     const year = new Date();
     res.locals.actualYear = year.getFullYear();
     res.locals.nombreSitio = "Agencia de Viajes";


     // Cada sentencia, función, variable, etc. representa un middleware en express, cuando se intenta imprimir el res, la página no muestra nada, en ese caso se usa el método next, para que vaya el siguiente middleware: 
     next();

     // Sino funciona el next(), se forza usando return next();
});

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Definir la carpeta publica
app.use(express.static('public'));

// Agregar router
// El método use soporta todos los verbos, get post, patch, push y delete
app.use('/', router);

// Puerto y HOST para la app
// se asigna la ip del archivo variables.env o sino se asigna una ip inválida (0.0.0.0) Heroku la reconocerá y le asignará una valida, eso es lo que se requiere
const host = process.env.HOST || '0.0.0.0';

// asignamos una variable de entorno vacía, como no sabremos que puerto le asignará HEROKU, entonces se hace de esta forma, para que HEROKU lo asigne
const puerto = process.env.PORT || 4000;

app.listen(puerto, host, () => {
     console.log('El servidor está funcionando');
});


// express soporta get, post, put, patch y delete, se puede enviar una petición hacia una url (en este caso '/')
// El método get toma la info cuando visitas la página, express utiliza en el callback lo que son request, response y next.
//request es lo que tu envías y response es lo que express te envía
// app.get('/', (req, res) => {
//      // node te envía las respuestas, sin embargo puedes crear tu propia respuesta:
//      res.send('Inicio');

//      // ó una respuesta tipo json:
//      //res.json({id: 1});

//      // o una respuesta mostrando una vista:
//      //res.render();
// });

// Se pueden usar en páginas distintas
// se recomienda crear cada ruta en una carpeta routes
// Ejemplo localhost:4000/contacto
// app.get('/contacto', (req, res) => {
//      res.send('Contacto');
// });
// app.get('/nosotros', (req, res) => {
//      res.send('Nosotros');
// });


// Se usa la variable que contiene la función 
// para ejecutar express, por medio del método .listen, toma el puerto
app.listen(port, () => {
     // el callback nos dice que puerto está usando el servidor
     console.log(`El servidor está funcionando en el puerto ${port}`);
});

