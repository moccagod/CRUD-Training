import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "../../assets/database/supabaseClient";
import Navbar from "../layouts/Navbar";
const TodoDetail = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const navigate = useNavigate();

  const fetchTodo = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (!error && data) {
      setTodo(data);
    } else {
      alert("Catatan tidak ditemukan atau bukan milik Anda");
      navigate("/");
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Yakin ingin menghapus Catatan ini?");
    if (!confirm) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id); // hanya bisa hapus yang dia punya

    if (!error) navigate("/");
    else alert("Gagal menghapus data");
  };

  useEffect(() => {
    fetchTodo();
  }, [id]);

  if (!todo) return <div className="p-6">Memuat data...</div>;

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold mb-4">{todo.title}</h1>
        <p className="text-gray-700 whitespace-pre-line">{todo.note}</p>

        <div className="flex gap-4 mt-8">
          <Link
            to={`/edit/${todo.id}`}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 cursor-pointer"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
          >
            Hapus
          </button>
          <Link
            to="/"
            className="ml-auto text-blue-600 hover:underline self-center cursor-pointer"
          >
            ← Kembali
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TodoDetail;
