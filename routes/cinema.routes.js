const express = require('express');
const router = express.Router();
const Cinema = require('../models/Cinema');

// GET: Obtener todos los cines con los datos de las películas vinculadas
router.get('/', async (req, res, next) => {
  try {
    const cinemas = await Cinema.find().populate('movies');
    return res.status(200).json(cinemas);
  } catch (error) {
    return next(error);
  }
});

// GET: Obtener un cine por ID
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const cinema = await Cinema.findById(id).populate('movies');
    if (!cinema) {
      return res.status(404).json({ message: 'Cine no encontrado' });
    }
    return res.status(200).json(cinema);
  } catch (error) {
    return next(error);
  }
});

// POST: Crear un nuevo cine
router.post('/', async (req, res, next) => {
  try {
    const newCinema = new Cinema(req.body);
    const createdCinema = await newCinema.save();
    return res.status(201).json(createdCinema);
  } catch (error) {
    return next(error);
  }
});

// PUT: Modificar un cine o añadirle películas
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedCinema = await Cinema.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedCinema) {
      return res.status(404).json({ message: 'Cine no encontrado' });
    }
    return res.status(200).json(updatedCinema);
  } catch (error) {
    return next(error);
  }
});

// PUT: Añadir una película específica a un cine
router.put('/:id/movies', async (req, res, next) => {
  const { id } = req.params;
  const { movieId } = req.body;
  try {
    const updatedCinema = await Cinema.findByIdAndUpdate(
      id,
      { $addToSet: { movies: movieId } },
      { new: true }
    ).populate('movies');

    if (!updatedCinema) {
      return res.status(404).json({ message: 'Cine no encontrado' });
    }
    return res.status(200).json(updatedCinema);
  } catch (error) {
    return next(error);
  }
});

// DELETE: Eliminar un cine
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCinema = await Cinema.findByIdAndDelete(id);
    if (!deletedCinema) {
      return res.status(404).json({ message: 'Cine no encontrado' });
    }
    return res.status(200).json({ message: 'Cine eliminado correctamente', cinema: deletedCinema });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;