const express = require("express");

const movieController = require("../controllers/movie.controller");
const verifyAuth = require("../middlewares/verifyAuth.middleware");

const movieRoutes = express.Router();

movieRoutes.post("/", verifyAuth, movieController.addMovie);
movieRoutes.get("/", verifyAuth, movieController.getAllMovies);
movieRoutes.get("/:id", verifyAuth, movieController.getMovieById);
movieRoutes.put("/:id", verifyAuth, movieController.updateMovieById);
movieRoutes.delete("/:id", verifyAuth, movieController.deleteMovieById);

module.exports = movieRoutes;
