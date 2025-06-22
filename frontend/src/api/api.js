import axios from "../config/axiosConfig";

const registerUser = async (formData) => {
  return axios.post("/auth/signup", formData);
};
const loginUser = async (formData) => {
  return axios.post("/auth/signin", formData);
};
const getloginUser = async () => {
  return axios.get("/auth/loggedin-user");
};

const getAllMovies = () => {
  return axios.get("/movies/");
};

const addMovie = (data) => {
  return axios.post("/movies/", data);
};

const deleteMovie = (id) => {
  return axios.delete(`/movies/${id}`);
};

const updateMovie = (id, data) => {
  return axios.put(`/movies/${id}`, data);
};

export {
  registerUser,
  loginUser,
  getAllMovies,
  addMovie,
  deleteMovie,
  updateMovie,
  getloginUser
};
