import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../assets/database/supabaseClient";

const Home = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("id", { ascending: false });

    if (!error) setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">📋 ToDo List</h1>
        <Link
          to="/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Tambah ToDo
        </Link>
      </div>

      {todos.length === 0 ? (
        <p className="text-gray-600">Belum ada todo.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="bg-white p-4 shadow rounded hover:shadow-md transition"
            >
              <h2 className="font-semibold text-xl">{todo.title}</h2>
              <p className="text-gray-600 mt-2 line-clamp-3">{todo.note}</p>
              <Link
                to={`/todo/${todo.id}`}
                className="inline-block mt-4 text-blue-600 hover:underline"
              >
                Lihat Detail →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
