import { Navigate, Route, Routes } from "react-router-dom";
import Loading from "../components/Loading";
import { useAuth } from "../context/AuthContext";
import Home from "../pages";

import Profile from "../pages/profile/Profile";
import About from "../pages/about";
import Team from "../pages/about/Team";
import Register from "../pages/auth/register/Register";
import Login from "../pages/auth/login/Login";

const ProtectedRoutes = ({ children }) => {
  const { isLoggedIn, isloading } = useAuth();

  if (isloading) {
    return <Loading />;
  }

  if (isLoggedIn) {
    return children;
  }

  return <Navigate to="/" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/profile"
        element={
          <ProtectedRoutes>
            <Profile/>
          </ProtectedRoutes>
        }
      />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team/>} />
    </Routes>
  );
};

export default AppRoutes;
