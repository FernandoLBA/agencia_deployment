import Sequelize from 'sequelize';
// require('dotenv').config({ path: 'variables.env' });// NO FUNCIONA
// ESTE SI FUNCIONA
import dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });

// Para conectarse a la base de datos a través de sequelize, parámetros ('nombreBD','Usuario','contraseña, {parámetros de conexión a mysql y de sequelize})
module.exports = new Sequelize(process.env.BD_NOMBRE, process.env.BD_USER, process.env.BD_PASS, {
     host: process.env.BD_HOST,
     port: process.env.BD_PORT,
     dialect: 'mysql',
     define: {
          timestamps: false
     },
     pool: {
          max: 5,
          min: 0,
          acquires: 30000,
          idle: 10000
     },
     operatorAliases: 1
});