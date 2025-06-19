import { useEffect, useState } from "react";
import { Plus, Search } from 'lucide-react';
import { addMovie, deleteMovie, getAllMovies, updateMovie } from "../api/api";
import { useAuth } from "../context/AuthContext";
import "./index.css";
import Navbar from "../components/navbar/Navbar";
import { Link } from "react-router-dom";

const initialMovieData = {
  name: "",
  year: "",
  genre: "",
  rating: "",
  status: "Plan to Watch",
  poster: ""
};

const Home = () => {
  const [form, setForm] = useState({ ...initialMovieData });
  const [movies, setMovies] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const { isLoggedIn, isLoading } = useAuth();

  const isUpdate = !!form._id;

  useEffect(() => {
    if (isLoggedIn && !isLoading) {
      fetchMovies();
    }
  }, [isLoggedIn, isLoading]);

  const fetchMovies = async () => {
    try {
      const response = await getAllMovies();
      setMovies(response.data?.movies || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleDialog = (isOpen) => {
    setDialogOpen(isOpen);
    if (!isOpen) {
      setForm({ ...initialMovieData });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMovie(id);
      await fetchMovies();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUpdate) {
        await updateMovie(form._id, form);
      } else {
        await addMovie(form);
      }
      await fetchMovies();
      handleDialog(false);
    } catch (error) {
      console.error("Error submitting movie:", error);
    }
  };

  const handleUpdate = (movie) => {
    const { userId, __v, ...data } = movie;
    handleDialog(true);
    setForm(data);
  };

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movie.genre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || 
                         movie.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="auth-container">
        <div className="auth-background" />
        <div className="auth-overlay" />
        
        <div className="auth-content">
          <div className="app-header">
          <Navbar/>
          </div>

          <div className="journey-section">
            <h2>Track Your Movie Journey</h2>
            <p className="journey-description">
              Discover, organize, and rate your favorite movies and TV shows. Never forget what to watch next with WatchBuddy.
            </p>
                        <div className="team-link">
        
<p>Want to know who built this?</p>
<Link to="/team" className="meet-team-btn">
  Meet the Team
</Link>


        </div>
          </div>

          
          <div className="auth-features">
            <div className="feature-card">
              <div className="feature-icon">
                <span>+</span>
              </div>
              <h3>Add Movies</h3>
              <p>Easily add movies and shows to your personal watchlist</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <span>✓</span>
              </div>
              <h3>Track Progress</h3>
              <p>Keep track of what you want to watch, are watching, or have watched</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <span>★</span>
              </div>
              <h3>Rate & Review</h3>
              <p>Rate your favorite movies and keep track of your preferences</p>
            </div>
      
          </div>
                
        </div>
        
      </div>
    );
  }

return (
    <div className="app-container">
      <div className="app-background" />
      <div className="app-overlay" />
      
      <Navbar/>
      
      <div className="main-content">
        <div className="search-wrapper">
          <div className="search-controls">
            <div className="search-bar">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="filter-controls">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Movies</option>
                <option value="Plan to Watch">Plan to Watch</option>
                <option value="Watching">Watching</option>
                <option value="Completed">Completed</option>
                <option value="Dropped">Dropped</option>
              </select>
              
              <button 
                className="add-movie-btn"
                onClick={() => setDialogOpen(true)}
              >
                <Plus size={18} />
                <span>Add Movie</span>
              </button>
            </div>
          </div>
        </div>

        <div className="watchlist-header">
          <h2>Your Watchlist</h2>
          <p className="movie-count">
            {filteredMovies.length} {filteredMovies.length === 1 ? 'movie' : 'movies'} in your collection
          </p>
        </div>

        <div className="movies-grid">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <div key={movie._id} className="movie-card">
                <div className="movie-poster">
                  <span className={`status-badge ${movie.status.replace(/\s+/g, '-').toLowerCase()}`}>
                    {movie.status}
                  </span>
                  <img src={movie.poster || 'default-poster.jpg'} alt={movie.name} />
                </div>
                
                <div className="movie-details">
                  <h3 className="movie-title">{movie.name}</h3>
                  <div className="movie-meta">
                    <span>{movie.year}</span>
                    <span>{movie.rating}/10</span>
                    <span>{movie.genre}</span>
                  </div>
                  
                  <div className="movie-actions">
                    <button 
                      className="action-btn update-btn"
                      onClick={() => handleUpdate(movie)}
                    >
                      Update
                    </button>
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => handleDelete(movie._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              {searchTerm || filterStatus !== "all" 
                ? "No movies match your search" 
                : "No movies found. Start adding!"}
            </div>
          )}
        </div>
      </div>

      {isDialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog">
            <h2>{isUpdate ? "Update Movie" : "Add Movie"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Movie Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  name="year"
                  placeholder="Year"
                  value={form.year}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <select
                  name="genre"
                  value={form.genre}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a genre</option>
                  <option value="Action">Action</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Drama">Drama</option>
                  <option value="Horror">Horror</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Romance">Romance</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Animation">Animation</option>
                  <option value="Documentary">Documentary</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  required
                >
                  <option value="Plan to Watch">Plan to Watch</option>
                  <option value="Watching">Watching</option>
                  <option value="Completed">Completed</option>
                  <option value="Dropped">Dropped</option>
                </select>
              </div>
              <div className="form-group">
                <input
                  type="number"
                  name="rating"
                  placeholder="Rating (1–10)"
                  value={form.rating}
                  onChange={handleChange}
                  min={1}
                  max={10}
                  step="0.1"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="poster"
                  placeholder="Poster URL"
                  value={form.poster}
                  onChange={handleChange}
                />
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => handleDialog(false)}>
                  Cancel
                </button>
                <button type="submit">{isUpdate ? "Update" : "Add"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;