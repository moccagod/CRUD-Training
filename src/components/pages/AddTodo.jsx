import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../assets/database/supabaseClient";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const navigate = useNavigate();

  const handleAdd = async () => {
    if (!title.trim() || !note.trim()) {
      alert("Judul dan catatan wajib diisi!");
      return;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      alert("Gagal mendapatkan data pengguna");
      return;
    }

    const { error } = await supabase.from("todos").insert([
      {
        title,
        note,
        user_id: user.id,
      },
    ]);

    if (!error) {
      navigate("/");
    } else {
      alert("Gagal menambahkan catatan");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-full max-w-2xl mx-auto py-10 px-6 flex-1">
        {" "}
        {/* Menggunakan max-w-2xl untuk lebar yang lebih pas */}
        <h1 className="text-2xl font-bold mb-6">Tambah Catatan</h1>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Judul</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Contoh: Perjalananku"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Catatan</label>
          <textarea
            className="w-full border px-3 py-2 rounded min-h-[100px]"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Contoh: Perjalananku menuju kota baru"
          />
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/")}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 cursor-pointer"
          >
            Kembali
          </button>

          <button
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer"
            onClick={handleAdd}
          >
            Simpan
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddTodo;
