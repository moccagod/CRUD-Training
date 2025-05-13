import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "../../assets/database/supabaseClient";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";

const TodoDetail = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
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
    setLoading(false);
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto py-10 px-6">
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Memuat data...</p>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4">{todo.title}</h1>
            <p className="text-gray-700 whitespace-pre-line">{todo.note}</p>

            <div className="flex gap-4 mt-8">
              <Link
                to={`/edit/${todo.id}`}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors cursor-pointer"
              >
                Hapus
              </button>
              <Link
                to="/"
                className="ml-auto text-blue-600 hover:underline self-center"
              >
                ← Kembali
              </Link>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default TodoDetail;
