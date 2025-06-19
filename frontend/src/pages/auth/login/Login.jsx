import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



import "./Login.css";
import { loginUser } from "../../../api/api";
import { useAuth } from "../../../context/AuthContext";

const initialData = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const { getLoggedInUser } = useAuth();
  const [formData, setFormData] = useState({ ...initialData });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await loginUser(formData);
      console.log(response);

      setError("");
      setFormData({ ...initialData });
      localStorage.setItem("chung-token", response.data.token);
      await getLoggedInUser();
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Some error occurred");
    }
  };

  return (
    <div>
      <div className="login-container">
        <div className="logo-text">WATCHBUDDY</div>

        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="login-title">Login</h2>

          <label>
            Email
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          {error && <p className="login-error">{error}</p>}
          <button type="submit">Login</button>

          <p className="login-link">
            Don't have an account? <Link to="/register">Register</Link> |
          
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
