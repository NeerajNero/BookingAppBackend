import Movie from '../models/Movie.js';

export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch movies' });
  }
};

export const addMovie = async (req, res) => {
  try {
    const { title, description, showtimes, duration } = req.body;
    const newMovie = new Movie({ title, description, showtimes, duration });
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: 'Error adding movie' });
  }
};
