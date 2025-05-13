import { Routes, Route } from "react-router-dom";
import AddTodo from "./components/pages/AddTodo";
import EditTodo from "./components/pages/EditTodo";
import TodoDetail from "./components/pages/TodoDetail";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/auth/PrivateRoute";
import Register from "./components/auth/Register";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/add"
        element={
          <PrivateRoute>
            <AddTodo />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <PrivateRoute>
            <EditTodo />
          </PrivateRoute>
        }
      />
      <Route
        path="/todo/:id"
        element={
          <PrivateRoute>
            <TodoDetail />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
