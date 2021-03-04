import {
     Testimonial
} from '../models/Testimoniales.js';

const guardarTestimonial = async (req, res) => {
     // Validar...

     // Sacará del objeto req.body la información
     const { nombre, correo, mensaje} = req.body;

     const errores = [];
     // El trim quita los espacios vacíos al inicio y al final
     if(nombre.trim() === '') {
          errores.push({mensaje : 'El nombre está vacío.'});
     }

     if(correo.trim() === '') {
          errores.push({mensaje : 'El correo está vacío.'});
     }

     if(mensaje.trim() === '') {
          errores.push({mensaje : 'El mensaje está vacío.'});
     }

     if(errores.length > 0) {
          // Consultar testimoniales existentes
          const testimoniales = Testimonial.findAll();

          // Mostrar la vista con errores
          res.render('testimoniales', {
               pagina: 'Testimoniales',
               errores,
               nombre,
               correo,
               mensaje,
               testimoniales
          })
     } else {
          // Almacenar en la base de datos
          try {
               await Testimonial.create({
                    nombre,
                    correo,
                    mensaje
               });

               // Redirecciona al usuario
               res.redirect('/testimoniales');
          } catch (error) {
               console.log(error);
          }
     }
}

export {
     guardarTestimonial
}