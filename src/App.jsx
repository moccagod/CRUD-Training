import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import AddTodo from "./components/pages/AddTodo";
import TodoDetail from "./components/pages/TodoDetail";
import EditTodo from "./components/pages/EditTodo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddTodo />} />
      <Route path="/todo/:id" element={<TodoDetail />} />
      <Route path="/edit/:id" element={<EditTodo />} />
    </Routes>
  );
}

export default App;
