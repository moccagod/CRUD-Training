// src/components/auth/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../assets/database/supabaseClient";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert("Gagal login");
    else navigate("/");
  };

  return (
    <div className="max-w-sm mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
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
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Login
      </button>
      <p className="text-sm mt-4 text-center">Belum punya akun?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">Daftar di sini</Link>
</p>
    </div>
  );
};

export default Login;
