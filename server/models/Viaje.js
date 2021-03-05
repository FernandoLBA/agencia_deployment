import Sequelize from 'sequelize';
import db from '../config/db.js'

// definir el primer modelo
// El método define obtiene los parámetros ('nombreTabla',{objetoConfiguración})
// En la configuración se colocan los nombres de los campos(menos id) y el tipo de datos, por ejemplo varchar en sequelize en STRING.
export const Viaje = db.define('viajes', {
     titulo: {
          type: Sequelize.STRING
     },
     precio: {
          type: Sequelize.STRING
     },
     fecha_ida: {
          type: Sequelize.DATE
     },
     fecha_vuelta: {
          type: Sequelize.DATE
     },
     imagen: {
          type: Sequelize.STRING
     },
     descripcion: {
          type: Sequelize.STRING
     },
     disponibles: {
          type: Sequelize.STRING
     },
     slug: {
          type: Sequelize.STRING
     },
});