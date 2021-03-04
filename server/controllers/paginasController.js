// se importa Viaje desde el modelo Viaje.js
import { Viaje } from "../models/Viaje.js";
import { Testimonial } from "../models/Testimoniales.js";

const paginaInicio = async (req, res) => {

     const promiseDB = [];

     // se agregan las consultas al arreglo
     // Consultar 3 viajes del modelo 
     promiseDB.push(Viaje.findAll({ limit: 3 }));// Están en la posición 0 del arreglo
     promiseDB.push(Testimonial.findAll({ limit: 3 }))// Están en la posición 1 del arreglo

     // Al usar async await se debe usar try catch
     try {
          // Se usan promesas para mostrar el resultado de ambas consultas, una vez estén listas las 2 y no 1 de las 2
          const resultado = await Promise.all(promiseDB);

          // Muestra la info en la vista
          res.render('Inicio', {
               pagina: 'Inicio',
               clase: 'home',
               viajes: resultado[0],
               testimoniales: resultado[1]
          });
     } catch (error) {
          console.log(error);
     };
};

const paginaNosotros = (req, res) => {
     const viajes = 'Cambiando el texto';
     res.render('nosotros', {
          pagina: 'Nosotros'
     });
};

// función asyn await
const paginaViajes = async (req, res) => {
     // Consultar base de datos
     // esto traerá todos los resultados que hayan en la tabla
     const viajes = await Viaje.findAll();

     res.render('viajes', {
          pagina: 'Próximos Viajes',
          viajes
     });
};

const paginaTestimoniales = async (req, res) => {

     try {
          // Consultar a la BD
          const testimoniales = await Testimonial.findAll();

          // Muestra la info en la vista
          res.render('testimoniales', {
               pagina: 'Testimoniales',
               testimoniales
          });
     } catch (error) {
          console.log(error);
     }
};

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
     // el slug hace referencia al comodín colocado en el routing
     const { slug } = req.params;

     try {
          const viaje = await Viaje.findOne({ where: { slug } });

          res.render('viaje', {
               pagina: 'Información de Viaje',
               viaje
          });
     } catch (error) {
          console.log(error);
     }
};

export {
     paginaInicio,
     paginaNosotros,
     paginaViajes,
     paginaTestimoniales,
     paginaDetalleViaje
}