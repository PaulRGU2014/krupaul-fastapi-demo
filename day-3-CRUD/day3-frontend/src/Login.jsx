import { useState } from "react";
import { Link } from "react-router-dom";

function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const res = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      setError("Invalid username or password");
      return;
    }

    const data = await res.json();
    setToken(data.access_token);
    localStorage.setItem("token", data.access_token);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>

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

      <button>Login</button>
      <p>
        New user? <Link to="/register">Create account</Link>
      </p>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default Login;
