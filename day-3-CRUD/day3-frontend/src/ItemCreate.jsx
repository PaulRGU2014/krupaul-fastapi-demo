import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./config";

function ItemCreate() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim().length === 0) {
      setError("Name cannot be empty");
      return;
    }

    const res = await fetch(`${API_BASE_URL}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      setError("Server rejected input");
      return;
    }

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Item</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button>Create</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default ItemCreate;
