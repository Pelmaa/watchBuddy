import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./navbar.css";

const Navbar = () => {
  const { user, logout, isLoggedIn } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <h1 className="navbar-title">WatchBuddy</h1>
        <p className="navbar-subtitle">Your personal movie companion</p>
      </Link>

      <div className="navbar-links">
        {isLoggedIn && (
          <>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
            <span className="nav-user">{user?.name || "MovieLover"}</span>
          </>
        )}
        {isLoggedIn ? (
          <button className="nav-button" onClick={logout}>Logout</button>
        ) : (
          <Link to="/login" className="nav-button">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
