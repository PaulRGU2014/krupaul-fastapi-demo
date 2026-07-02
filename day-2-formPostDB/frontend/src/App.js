import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [createdItem, setCreatedItem] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8002/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    const data = await response.json();
    setCreatedItem(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Create Item</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>

      {createdItem && (
        <div style={{ marginTop: "20px" }}>
          <h2>Created Item:</h2>
          <p>ID: {createdItem.id}</p>
          <p>Name: {createdItem.name}</p>
        </div>
      )}
    </div>
  );
}

export default App;
