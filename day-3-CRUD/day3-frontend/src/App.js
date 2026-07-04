import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemList from "./ItemList";
import ItemDetail from "./ItemDetail";
import ItemCreate from "./ItemCreate";
import ItemEdit from "./ItemEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ItemList />} />
        <Route path="/new" element={<ItemCreate />} />
        <Route path="/items/:id" element={<ItemDetail />} />
        <Route path="/items/:id/edit" element={<ItemEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
