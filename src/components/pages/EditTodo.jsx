import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../assets/database/supabaseClient";

const EditTodo = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const navigate = useNavigate();

  const fetchTodo = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("id", id)
      .single();

    if (!error) {
      setTitle(data.title);
      setNote(data.note);
    } else {
      navigate("/");
    }
  };

  const handleUpdate = async () => {
    if (!title.trim() || !note.trim()) {
      alert("Judul dan catatan tidak boleh kosong.");
      return;
    }

    const { error } = await supabase
      .from("todos")
      .update({ title, note })
      .eq("id", id);

    if (!error) navigate(`/todo/${id}`);
    else alert("Gagal memperbarui todo");
  };

  useEffect(() => {
    fetchTodo();
  }, [id]);

  return (
    <div className="max-w-xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-6">✏️ Edit ToDo</h1>

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
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Simpan Perubahan
      </button>
    </div>
  );
};

export default EditTodo;
