const mongoose = require('mongoose');
const Cinema = require('../models/Cinema');
const Movie = require('../models/Movie');

const urlDb = 'mongodb://127.0.0.1:27017/proyecto-basico-express-movies';

const seedCinemas = async () => {
  try {
    // 1. Conexión a la base de datos
    await mongoose.connect(urlDb);
    console.log('Conectado a MongoDB para sembrar cines...');

    // 2. Obtener películas existentes
    const movies = await Movie.find();
    if (!movies.length) {
      console.log('No se encontraron películas. Ejecuta primero movies.seed.js');
      return;
    }

    // 3. Array de cines vinculando los IDs de las películas
    const cinemas = [
      {
        name: 'Cines Callao',
        location: 'Plaza del Callao, Madrid',
        movies: [movies[0]._id, movies[1]._id],
      },
      {
        name: 'Kinépolis Madrid Ciudad de la Imagen',
        location: 'Pozuelo de Alarcón, Madrid',
        movies: [movies[2]._id, movies[3]._id, movies[4]._id],
      },
      {
        name: 'Cine Yelmo Ideal',
        location: 'Calle del Doctor Cortezo, Madrid',
        movies: [movies[4]._id, movies[5]._id],
      },
      {
        name: 'Cinesa Proyecciones',
        location: 'Calle de Fuencarral, Madrid',
        movies: [movies[0]._id, movies[5]._id],
      },
    ];

    // 4. Limpieza de colección previa si existe
    const allCinemas = await Cinema.find();
    if (allCinemas.length > 0) {
      await Cinema.collection.drop();
      console.log('Colección "cinemas" anterior eliminada.');
    }

    // 5. Inserción de los documentos
    await Cinema.insertMany(cinemas);
    console.log('¡Cines sembrados correctamente!');
  } catch (error) {
    console.error('Error al sembrar los cines:', error);
  } finally {
    // 6. Cierre de conexión
    await mongoose.disconnect();
    console.log('Conexión con MongoDB cerrada.');
  }
};

seedCinemas();