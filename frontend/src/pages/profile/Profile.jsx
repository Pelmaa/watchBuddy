import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useAuth } from "../../context/AuthContext";
import { getAllMovies } from "../../api/api";
import "./profile.css";

const Profile = () => {
  const { user, isLoading } = useAuth();
  const [movies, setMovies] = useState([]);
  const [isMovieLoading, setMovieLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getAllMovies();
        const userMovies = data.filter((movie) => movie.userId === user?._id);
        setMovies(userMovies);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setMovieLoading(false);
      }
    };

    if (user?._id) fetchMovies();
  }, [user]);

  if (isLoading || isMovieLoading) {
    return (
      <>
        <Navbar />
        <div style={{ padding: "2rem", textAlign: "center", color: "#fff" }}>
          <p>Loading your profile...</p>
        </div>
      </>
    );
  }

  if (!user?.email) {
    return (
      <>
        <Navbar />
        <p style={{ textAlign: "center", color: "#fff" }}>User not logged in.</p>
      </>
    );
  }

  const total = movies.length;
  const completed = movies.filter((m) => m.watched === "Completed").length;
  const watching = movies.filter((m) => m.watched === "Watching").length;
  const plan = movies.filter((m) => m.watched === "Plan to Watch").length;
  const dropped = movies.filter((m) => m.watched === "Dropped").length;

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div className="profile-card">
          <h2>👤 Your Profile</h2>
          <p><strong>Full Name:</strong> {user.name}</p>
          <p><strong>Email Address:</strong> {user.email}</p>
          <p><strong>Phone Number:</strong> {user.phoneNumber || "Not provided"}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Joined On:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          <p><strong>Status:</strong> Active</p>

          <hr />

          <h3>🎬 Movie Statistics</h3>
          <ul>
            <li><strong>Total Movies:</strong> {total}</li>
            <li><strong>Completed:</strong> {completed}</li>
            <li><strong>Watching:</strong> {watching}</li>
            <li><strong>Plan to Watch:</strong> {plan}</li>
            <li><strong>Dropped:</strong> {dropped}</li>
          </ul>

          <hr />
          <p className="note">This is your WatchBuddy profile. Enjoy your watch journey!</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
