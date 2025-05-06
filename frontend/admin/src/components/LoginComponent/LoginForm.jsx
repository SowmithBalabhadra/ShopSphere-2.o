import React, { useState } from "react";
import axios from "axios";
import "./LoginComponent.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleAlertAndRedirect = () => {
    <p className="success-message">Successful</p>
    alert("Login successful!");
    window.location.href = "http://localhost:5173/add";  // Redirect to Google after the alert
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Send a POST request to the backend login endpoint
      const response = await axios.post("http://localhost:4000/api/admin/login", formData);
      
      // Check if login was successful based on the server's response
      if (response.status === 200 && response.data.success) {
        {handleAlertAndRedirect()} 
        
        console.log("Token:", response.data.token);
        // Redirect or save the token here if necessary
      } else {
        // Handle cases where success is false but no error was thrown
        setError(response.data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      // Capture and display error messages from the server
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      {error && <p className="error-message">{error}</p>}

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
