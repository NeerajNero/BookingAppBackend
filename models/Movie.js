import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  showtimes: [String],
  duration: String,   
}, { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema, "bookingMovieData");
export default Movie;
