import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await API.post("/admin/login", formData);

      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin");
    } catch (err) {
      setError("Invalid username or password.");
    }
  }

  return (
    <main className="section">
      <div className="login-card">
        <h1>Admin Login</h1>
        <p>Login to manage Deep Clean & Wash bookings.</p>

        {error && <p className="error-message">{error}</p>}

        <form className="booking-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </main>
  );
}

export default AdminLogin;