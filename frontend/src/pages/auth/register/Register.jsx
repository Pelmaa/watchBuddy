import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Register.css";
import { registerUser } from "../../../api/api";

const initialData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  gender: "",
};

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ ...initialData });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Password and Confirm Password do not match.");
      return;
    }
    if (!formData.gender) {
      setError("Please select a gender.");
      return;
    }

    try {
      const response = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        gender: formData.gender,
      });

      console.log(response.data);

      setError("");
      setFormData({ ...initialData });
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Some error occurred.");
    }
  };
  return (
    <div className="register-container">
      <div className="logo-text">WATCHBUDDY</div>
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="register-title">Register</h2>

        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
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

        <label>
          Confirm Password
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Phone Number
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </label>

       <div className="form-group">
  <label>Gender:</label>
  <div className="gender-options">
    <label>
      <input
        type="radio"
        name="gender"
        value="Male"
        checked={formData.gender === "Male"}
        onChange={handleChange}
        required
      />
      Male
    </label>
    <label>
      <input
        type="radio"
        name="gender"
        value="Female"
        checked={formData.gender === "Female"}
        onChange={handleChange}
        required
      />
      Female
    </label>
  </div>
</div>


        {error && <p className="register-error">{error}</p>}

        <button type="submit">Register</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
