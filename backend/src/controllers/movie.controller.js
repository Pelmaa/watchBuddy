const movieService = require("../services/movie.service");

const getAllMovies = async (req, res) => {
  const user = req.user;
  const { watched } = req.query;

  const filter = {};
  if (watched !== undefined) {
    filter.watched = watched === "true";
  }

  const movies = await movieService.getAllMovies(user._id, filter);
  res.status(200).json({ movies });
};

const getMovieById = async (req, res) => {
  const id = req.params.id;
  const user = req.user;

  const movie = await movieService.getMovieById(id, user._id);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(404).json({ message: `Movie with ID ${id} not found` });
  }
};

const addMovie = async (req, res) => {
  const user = req.user;
  const newMovie = req.body;

  if (!newMovie) {
    return res.status(400).json({ message: `Body cannot be empty` });
  }

  const keys = Object.keys(newMovie);
  const requiredKeys = ["name", "year", "genre","rating"];
  const missingKeys = requiredKeys.filter((key) => !keys.includes(key));

  if (missingKeys.length > 0) {
    return res.status(400).json({
      message: `Please provide all information: ${missingKeys.join(",")}`,
    });
  }

  const createdMovie = await movieService.addMovie(newMovie, user._id);
  res.status(201).json({ message: "Movie created", movie: createdMovie });
};

const updateMovieById = async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  const newMovie = req.body;

  if (!newMovie) {
    return res.status(400).json({ message: `Body cannot be empty` });
  }

  const keys = Object.keys(newMovie);
  const requiredKeys = ["name", "year", "genre","rating"];
  const missingKeys = requiredKeys.filter((key) => !keys.includes(key));

  if (missingKeys.length > 0) {
    return res.status(400).json({
      message: `Please provide all information: ${missingKeys.join(", ")}`,
    });
  }

  const updatedMovie = await movieService.updateMovieById(
    id,
    newMovie,
    user._id
  );
  if (updatedMovie) {
    res.json({
      message: `Movie ${id} updated successfully`,
      movie: updatedMovie,
    });
  } else {
    res.status(404).json({ message: `Movie ${id} not found` });
  }
};

const deleteMovieById = async (req, res) => {
  const user = req.user;
  const id = req.params.id;

  const isDeleted = await movieService.deleteMovieById(id, user._id);

  if (isDeleted) {
    res.json({ message: `Movie ${id} deleted successfully` });
  } else {
    res.status(404).json({ message: `Movie with ID ${id} not found` });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovieById,
  deleteMovieById,
};
