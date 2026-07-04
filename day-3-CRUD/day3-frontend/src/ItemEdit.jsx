import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./config";

function ItemEdit () {
  const {id} = useParams();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    fetch(`${API_BASE_URL}/items/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Item not found");
      } else {
        return res.json();
      }
    })
    .then((data) => {
      setName(data.name);
    })
    .catch(() => {
      setError("Unable to load item")
    })
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim().length === 0) {
      setError("Name cannot be empty");
      return;
    }

    const res = await fetch(`${API_BASE_URL}/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name})
    });

    if (!res.ok) {
      setError("Failed to update item");
    } else {
      navigate(`/items/${id}`);
    }
  }

  return (
    <div>
      <h1>Edit Item</h1>
      {error && <p style={{color: "red"}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  ); 

}

export default ItemEdit;