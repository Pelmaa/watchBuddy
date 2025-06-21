const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: String,
  year: Number,
  watched: Boolean,
    status: {
    type: String,
    enum: ["Plan to Watch", "Watching", "Completed", "Dropped"],
    default: "Plan to Watch"
  },
  genre:  {
    type: String,
    enum: [
      "Action",
      "Comedy",
      "Drama",
      "Horror",
      "Sci-Fi",
      "Thriller",
      "Romance",
      "Fantasy",
      "Animation",
      "Documentary",
      "Other",
    ],
    default: "Other",
  },
  rating: Number,
  poster: {
    type: String,
    default: 'default-poster.jpg',
   
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Movie = mongoose.model("movies", movieSchema);
module.exports = Movie;
