import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import ItemList from "./ItemList";
import ItemDetail from "./ItemDetail";
import ItemCreate from "./ItemCreate";
import ItemEdit from "./ItemEdit";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <BrowserRouter>
      <Routes>
        {token ? (
          <>
            <Route path="/" element={<ItemList />} />
            <Route path="/new" element={<ItemCreate />} />
            <Route path="/items/:id" element={<ItemDetail />} />
            <Route path="/items/:id/edit" element={<ItemEdit />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
