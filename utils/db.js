const mongoose = require('mongoose');

const urlDb = 'mongodb://127.0.0.1:27017/proyecto-basico-express-movies';

const connect = async () => {
  try {
    await mongoose.connect(urlDb);
    console.log('Conectado a MongoDB con éxito');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error.message);
  }
};

module.exports = { connect };