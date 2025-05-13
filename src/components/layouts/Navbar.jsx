import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../assets/database/supabaseClient";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 shadow-sm">
      <div className="max-w-6xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img className="w-10" src="./images/sticky-notes.png" alt="Logo" />
            <Link to="/" className="text-2xl font-bold text-gray-400">
              <span className="text-white">MOCCA</span>NOTE
            </Link>
          </div>

          {/* Logout Icon */}
          <div className="relative flex items-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-white p-2 rounded-full hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(31, 41, 55, 0.3)" }}
        >
          {" "}
          {/* bg-gray-800 dengan opacity 30% */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-xl font-semibold mb-4">Konfirmasi Keluar</h2>
            <p className="mb-6">Apakah kamu yakin mau keluar?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  handleLogout();
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors cursor-pointer"
              >
                Keluar
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors cursor-pointer"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
