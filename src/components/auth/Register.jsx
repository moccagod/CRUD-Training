import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../assets/database/supabaseClient";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert("Gagal register: " + error.message);
    } else {
      alert("Registrasi berhasil! Silakan login.");
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-800">
      <div className="max-w-sm w-full py-10 px-6 bg-white rounded-sm shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">DAFTAR</h1>
        <form onSubmit={handleRegister}>
          <input
            className="w-full border px-3 py-2 rounded mb-4"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full border px-3 py-2 rounded mb-4"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full cursor-pointer"
          >
            Daftar
          </button>
        </form>
        <p className="text-sm mt-4 text-center">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
