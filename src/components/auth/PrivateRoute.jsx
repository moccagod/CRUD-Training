// src/components/auth/PrivateRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../assets/database/supabaseClient";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
    };
    checkUser();
  }, []);

  if (isAuthenticated === null) {
    return <div className="p-6">Memuat...</div>; // loading sementara
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
