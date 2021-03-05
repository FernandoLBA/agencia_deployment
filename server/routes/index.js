import express from 'express';
import {
     paginaInicio, 
     paginaNosotros, 
     paginaViajes, 
     paginaTestimoniales, 
     paginaDetalleViaje
} from '../controllers/paginasController.js';
import { guardarTestimonial } from '../controllers/testimonialController.js';

const router = express.Router();

// Estas partes de código servían cómo controlador, pero son removidas y llevadas al controlador y luego importadas hasta aquí nuevamente:
// ---------Antes
// router.get('/', (req, res) => {
//      res.render('Inicio', {
//           pagina: 'Inicio'
//      });
// });
// ---------Después
// Se importan los datos a mostrar desde el controlador
router.get('/', paginaInicio);

// -----------Antes
// router.get('/nosotros', (req, res) => {
//      const viajes = 'Cambiando el texto';
     
//      // Una vez creado el archivo .pug, el método render escanea el archivo nosotros y muestra la vista, también podemos enviar información dentro de un objeto
//      res.render('nosotros', {
//           pagina: 'Nosotros'
//      });
// });

// ---------Después
router.get('/nosotros', paginaNosotros);

router.get('/viajes', paginaViajes);

// el :cualquierNombre es un comodín para crear cada ruta
router.get('/viajes/:slug', paginaDetalleViaje);

router.get('/testimoniales', paginaTestimoniales);

router.post('/testimoniales', guardarTestimonial);

export default router;