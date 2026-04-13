import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

// 🔐 YOUR ADMIN EMAILS
const allowedAdmins = [
  "23ru1a0570@ruce.ac.in",
  "23ru1a0580@ruce.ac.in",
];

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      console.log("USER CHECK:", data); // 🔥 debug

      if (data?.user) {
        const userEmail = data.user.email?.trim().toLowerCase();

        const allowedList = allowedAdmins.map(e =>
          e.trim().toLowerCase()
        );

        if (allowedList.includes(userEmail)) {
          setIsAllowed(true);
        } else {
          setIsAllowed(false);
        }
      } else {
        setIsAllowed(false);
      }

      setLoading(false);
    };

    checkUser();
  }, []);

  // 🔄 Loading screen
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#020617]">
        Checking authentication...
      </div>
    );
  }

  // ❌ Not allowed
  if (!isAllowed) {
    return <Navigate to="/admin" />;
  }

  // ✅ Allowed
  return children;
};

export default ProtectedRoute;