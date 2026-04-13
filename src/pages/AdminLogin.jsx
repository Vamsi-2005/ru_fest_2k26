import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import logo from "../assets/images/RU-logo.png";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔐 YOUR ADMIN EMAILS
  const allowedAdmins = [
    "23ru1a0570@ruce.ac.in",
    "23ru1a0580@ruce.ac.in",
  ];

  // 🔹 Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 LOGIN FUNCTION (FINAL FIXED)
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email.trim().toLowerCase(), // 🔥 FIXED
        password: form.password,
      });

      console.log("LOGIN RESPONSE:", data, error);

      if (error) {
        setError(error.message);
        return;
      }

      if (!data?.user) {
        setError("User not found ❌");
        return;
      }

      // 🔐 Normalize email
      const userEmail = data.user.email.trim().toLowerCase();

      const allowedList = allowedAdmins.map((e) =>
        e.toLowerCase().trim()
      );

      // 🔥 ADMIN CHECK FIXED
      if (!allowedList.includes(userEmail)) {
        setError("Access denied ❌ Not an admin");
        await supabase.auth.signOut();
        return;
      }

      // ✅ SUCCESS
      navigate("/admin/dashboard");

    } catch (err) {
      console.log(err);
      setError("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#142c5c] to-[#0f172a] flex flex-col items-center justify-center px-4">

      {/* 🔥 HEADER */}
      <div className="text-center text-white mb-6">
        <img src={logo} alt="logo" className="w-16 mx-auto mb-3" />

        <h1 className="text-3xl font-bold">
          Admin Login
        </h1>

        <p className="text-gray-300 mt-2">
          TECH FEST 2026 — Admin Dashboard
        </p>
      </div>

      {/* 🔥 CARD */}
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl 
      transition duration-300 hover:shadow-2xl">

        <form onSubmit={handleLogin} className="space-y-4">

          {/* EMAIL */}
          <div>
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter admin email"
              required
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-xl 
              focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              required
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-xl 
              focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* FORGOT PASSWORD */}
          <div className="text-right">
            <span
              onClick={() => navigate("/forgot-password")}
              className="text-blue-500 text-sm cursor-pointer hover:underline"
            >
              Forgot Password?
            </span>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-3 rounded-xl font-semibold 
            hover:scale-[1.05] transition duration-300 active:scale-95"
          >
            {loading ? "Logging in..." : "🔐 Login"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default AdminLogin;