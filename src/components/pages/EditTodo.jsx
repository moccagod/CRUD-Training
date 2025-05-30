import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../assets/database/supabaseClient";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";

const EditTodo = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const navigate = useNavigate();

  const fetchTodo = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id) // hanya ambil milik user ini
      .single();

    if (!error && data) {
      setTitle(data.title);
      setNote(data.note);
    } else {
      alert("Catatan tidak ditemukan atau bukan milik Anda");
      navigate("/");
    }
  };

  const handleUpdate = async () => {
    if (!title.trim() || !note.trim()) {
      alert("Judul dan catatan tidak boleh kosong.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("todos")
      .update({ title, note })
      .eq("id", id)
      .eq("user_id", user.id);

    if (!error) navigate(`/todo/${id}`);
    else alert("Gagal memperbarui Catatan");
  };

  useEffect(() => {
    fetchTodo();
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-full max-w-2xl mx-auto py-10 px-6 flex-1">
        {" "}
        {/* Menggunakan max-w-2xl untuk lebar yang lebih pas */}
        <h1 className="text-2xl font-bold mb-6">Edit Catatan</h1>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Judul</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Catatan</label>
          <textarea
            className="w-full border px-3 py-2 rounded min-h-[100px]"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <button
          onClick={() => navigate(`/todo/${id}`)}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 cursor-pointer mr-2"
        >
          Kembali
        </button>
        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Simpan Perubahan
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default EditTodo;
