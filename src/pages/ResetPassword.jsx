import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setMsg("Password must be at least 6 characters ❌");
      return;
    }

    if (password !== confirm) {
      setMsg("Passwords do not match ❌");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setMsg("Error updating password ❌");
    } else {
      setMsg("Password updated successfully ✅");

      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] text-white px-4">

      {/* CARD */}
      <div className="w-full max-w-md bg-[#0f172a]/80 backdrop-blur 
      p-6 rounded-2xl shadow-2xl border border-white/10 
      animate-fadeIn">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">
            🔐 Reset Password
          </h1>
          <p className="text-gray-400 text-sm">
            Enter your new password below
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleUpdate} className="space-y-4">

          {/* NEW PASSWORD */}
          <div>
            <label className="text-sm text-gray-300">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-[#020617] border border-gray-600 
              outline-none focus:ring-2 focus:ring-blue-500 
              transition duration-300"
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="text-sm text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-[#020617] border border-gray-600 
              outline-none focus:ring-2 focus:ring-blue-500 
              transition duration-300"
            />
          </div>

          {/* MESSAGE */}
          {msg && (
            <p className={`text-sm text-center 
            ${msg.includes("success") ? "text-green-400" : "text-red-400"}`}>
              {msg}
            </p>
          )}

          {/* BUTTON */}
          <button
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 
            py-3 rounded-lg font-semibold 
            hover:scale-[1.05] hover:shadow-lg 
            transition duration-300 active:scale-95"
          >
            Update Password
          </button>

        </form>

      </div>

    </div>
  );
};

export default ResetPassword;