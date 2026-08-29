const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// 1. GET: Obtener todas las películas
router.get('/', async (req, res, next) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (error) {
    return next(error);
  }
});

// 2. GET: Obtener película por ID
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }
    return res.status(200).json(movie);
  } catch (error) {
    return next(error);
  }
});

// 3. GET: Filtrar por título
router.get('/title/:title', async (req, res, next) => {
  const { title } = req.params;
  try {
    const movies = await Movie.find({ title: new RegExp(title, 'i') });
    return res.status(200).json(movies);
  } catch (error) {
    return next(error);
  }
});

// 4. GET: Filtrar por género
router.get('/genre/:genre', async (req, res, next) => {
  const { genre } = req.params;
  try {
    const movies = await Movie.find({ genre: new RegExp(genre, 'i') });
    return res.status(200).json(movies);
  } catch (error) {
    return next(error);
  }
});

// 5. POST: Crear nueva película
router.post('/', async (req, res, next) => {
  try {
    const newMovie = new Movie(req.body);
    const createdMovie = await newMovie.save();
    return res.status(201).json(createdMovie);
  } catch (error) {
    return next(error);
  }
});

// 6. PUT: Modificar una película existente
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedMovie) {
      return res.status(404).json({ message: 'Película no encontrada para actualizar' });
    }
    return res.status(200).json(updatedMovie);
  } catch (error) {
    return next(error);
  }
});

// 7. DELETE: Eliminar una película
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      return res.status(404).json({ message: 'Película no encontrada para eliminar' });
    }
    return res.status(200).json({ message: 'Película eliminada correctamente', movie: deletedMovie });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;