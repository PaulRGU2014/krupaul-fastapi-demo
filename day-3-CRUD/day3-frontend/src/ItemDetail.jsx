import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/items/${id}`)
    .then((res) => {
      if (res.status === 404) {
        throw new Error("Item not found");
      } else if (!res.ok) {
        throw new Error("Failed to fetch item");
      } else {
        return res.json();
      }
    })
    .then(setItem)
    .catch((err) => {
      setError(err.message);
    });
  }, [id]);

  if (error) {
    return <p style={{color: "red"}}>{error}</p>;
  }
  
  if (!item) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{item.name}</h1>
      <Link to={`/items/${id}/edit`}>Edit Item</Link>
    </div>
  );
}

export default ItemDetail;