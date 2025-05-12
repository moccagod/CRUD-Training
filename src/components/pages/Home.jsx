// App.js
import { useEffect, useState } from "react";
import { supabase } from "../../assets/database/supabaseClient";

function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("id", { ascending: false });
    if (!error) setNotes(data);
  };

  const addNote = async () => {
    setErrorMsg("");
    if (!title || !content) {
      setErrorMsg("Judul dan isi catatan harus diisi.");
      return;
    }

    const { data, error } = await supabase
      .from("notes")
      .insert([{ title, content }]);

    if (error) {
      console.error("Insert Error:", error); // tampilkan detail error di console
      setErrorMsg(`Gagal menambahkan catatan: ${error.message}`);
    } else {
      setTitle("");
      setContent("");
      fetchNotes();
    }
  };

  const updateNote = async () => {
    const { error } = await supabase
      .from("notes")
      .update({ title, content })
      .eq("id", editId);
    if (!error) {
      setEditId(null);
      setTitle("");
      setContent("");
      fetchNotes();
    }
  };

  const deleteNote = async (id) => {
    const { error } = await supabase.from("notes").delete().eq("id", id);
    if (!error) fetchNotes();
  };

  const startEdit = (note) => {
    setEditId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📒 Supabase Notes</h1>

      {errorMsg && <p className="text-red-600 mb-2">{errorMsg}</p>}

      <input
        type="text"
        placeholder="Judul"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded p-2 mb-2"
      />
      <textarea
        placeholder="Isi catatan"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border rounded p-2 mb-2"
      />
      {editId ? (
        <button
          onClick={updateNote}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2"
        >
          💾 Simpan Perubahan
        </button>
      ) : (
        <button
          onClick={addNote}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          ➕ Tambah Catatan
        </button>
      )}

      <hr className="my-6" />

      <ul>
        {notes.map((note) => (
          <li key={note.id} className="mb-4 border p-4 rounded shadow">
            <strong className="text-lg">{note.title}</strong>
            <p className="text-gray-700">{note.content}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => startEdit(note)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => deleteNote(note.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                🗑️ Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
