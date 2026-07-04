import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "./config";

function ItemList() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/items`)
    .then((res) => {
      if(!res.ok) {
        throw new Error("Failed to fetch items");
      } else {
        return res.json();
      }
    })
    .then(setItems)
    .catch(() => {
      setError("Failed to fetch items"); 
    })
  }, []);

  return (
    <div>
      <h1>Items</h1>
      <Link to="/new">Create New Item</Link>
      {error && <p style={{color: "red"}}>{error}</p>}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link to={`/items/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ItemList;