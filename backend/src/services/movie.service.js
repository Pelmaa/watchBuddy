const Movie = require("../models/movie.model");
const { isImageUrl } = require("../utils/helper.util");

const getAllMovies = async (userId, filter = {}) => {
  return await Movie.find({ userId, ...filter });
};

const getMovieById = async (id, userId) => {
  return await Movie.findOne({ _id: id, userId });
};

const addMovie = async (movieData, userId) => {
  if (movieData.poster && !isImageUrl(movieData.poster)) {
    throw new Error('Invalid image URL format');
  }

  const newMovie = new Movie({
    ...movieData,
    userId
  });
  
  return await newMovie.save();
};


const updateMovieById = async (id, movieData, userId) => {
  if (movieData.poster && !isImageUrl(movieData.poster)) {
    throw new Error('Invalid image URL format');
  }

  return await Movie.findOneAndUpdate(
    { _id: id, userId },
    movieData,
    { new: true, }
  );
};


const deleteMovieById = async (id, userId) => {
  const result = await Movie.deleteOne({ _id: id, userId });
  return result.deletedCount > 0;
};

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovieById,
  deleteMovieById,
};
