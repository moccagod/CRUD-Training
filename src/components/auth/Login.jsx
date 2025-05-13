import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../assets/database/supabaseClient";
import Footer from "../layouts/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert("Gagal login");
    else navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-black">
      <div className="max-w-sm w-full py-10 px-6 bg-gray-300 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">LOGIN</h1>
        <form onSubmit={handleLogin}>
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
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full cursor-pointer"
          >
            Login
          </button>
        </form>
        <p className="text-sm mt-4 text-center">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Daftar di sini
          </Link>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
