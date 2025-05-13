import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../assets/database/supabaseClient";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const navigate = useNavigate();

  const handleAdd = async () => {
    if (!title.trim() || !note.trim()) {
      alert("Judul dan catatan wajib diisi!");
      return;
    }

    const { error } = await supabase.from("todos").insert([{ title, note }]);

    if (!error) {
      navigate("/");
    } else {
      alert("Gagal menambahkan todo");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-6">➕ Tambah ToDo</h1>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Judul</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Contoh: Belajar React"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-medium">Catatan</label>
        <textarea
          className="w-full border px-3 py-2 rounded min-h-[100px]"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Contoh: Pelajari komponen, state, dan props"
        />
      </div>

      <button
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        onClick={handleAdd}
      >
        Simpan
      </button>
    </div>
  );
};

export default AddTodo;
