// src/components/auth/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../assets/database/supabaseClient";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
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
    <div className="max-w-sm mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
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
        onClick={handleRegister}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
      >
        Register
      </button>
      <p className="text-sm mt-4 text-center">
        Sudah punya akun?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Masuk di sini
        </Link>
      </p>
    </div>
  );
};

export default Register;
