import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required");
      return;
    }

    const res = await fetch("http://127.0.0.1:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const message = res.status === 400 ? "Username already registered" : "Failed to register";
      setError(message);
      return;
    }

    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>

      <input
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button>Create Account</button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default Register;
