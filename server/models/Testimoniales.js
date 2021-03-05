import Sequelize from 'sequelize';
import db from '../config/db.js'

// definir el primer modelo
// El método define obtiene los parámetros ('nombreTabla',{objetoConfiguración})
// En la configuración se colocan los nombres de los campos(menos id) y el tipo de datos, por ejemplo varchar en sequelize es STRING.
export const Testimonial = db.define('testimoniales', {
     nombre: {
          type: Sequelize.STRING
     },
     correo: {
          type: Sequelize.STRING
     },
     mensaje: {
          type: Sequelize.STRING
     },
});