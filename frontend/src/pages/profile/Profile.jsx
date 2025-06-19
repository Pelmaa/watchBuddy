import Navbar from "../../components/navbar/Navbar";
import { useAuth } from "../../context/AuthContext";
import "./profile.css";

const Profile = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading your profile...</p>;
  }

  if (!user?.email) {
    return <p>User not logged in.</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div className="profile-card">
          <h2>Your Profile</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Account Created:</strong> {new Date(user.createdAt).toLocaleDateString() || 'N/A'}</p>
          <p><strong>Status:</strong> Active</p>
         
        </div>
      </div>
    </div>
  );
};

export default Profile;
