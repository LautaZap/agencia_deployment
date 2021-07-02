import { Viaje } from '../models/Viaje.js'
import { Testimonial } from '../models/Testimoniales.js';


const paginaInicio = async(req, res) => { //req - lo que enviamos : res - lo que express nos responde
    
    // usando un array puedo ejecutar las 2 consultas a la bdd de manera simultanea para mejorar la performance
    const promiseDB = [];
    promiseDB.push( Viaje.findAll({ limit: 3 }) );
    promiseDB.push( Testimonial.findAll({ limit: 3 }) );
   

    // Consultar 3 viajes del modelo Viaje y 3 testimoniales
    try {
        const resultado = await Promise.all( promiseDB );
        res.render('Inicio', {
            pagina: 'inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error);
    }
   
}

const paginaNosotros = (req, res) => { //req - lo que enviamos : res - lo que express nos responde
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes =  async (req, res) => { 
    // Consultar bdd
    const viajes = await Viaje.findAll();

    


    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes
    });
}

const paginaTestimoniales = async (req, res) => {   
    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error);
    }
    
    
    
}

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    const{ slug } = req.params;
    
    try {
        const viaje = await Viaje.findOne({ where: { slug } });
        res.render('viaje', {
            pagina: 'Informacion Viaje',
            viaje
        })   
    } catch (error) {
        console.log(error);
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}