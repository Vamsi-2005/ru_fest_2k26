import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMsg("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/reset-password",
    });

    if (error) {
      setMsg("Error sending reset link ❌");
    } else {
      setMsg("Reset link sent to your email ✅");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] text-white px-4">

      {/* CARD */}
      <div className="w-full max-w-md bg-[#0f172a]/80 backdrop-blur 
      p-6 rounded-2xl shadow-2xl border border-white/10 
      animate-fadeIn">

        <h1 className="text-2xl font-bold text-center mb-4">
          🔑 Forgot Password
        </h1>

        <p className="text-gray-400 text-center mb-6 text-sm">
          Enter your email to receive reset link
        </p>

        <form onSubmit={handleReset} className="space-y-4">

          <input
            type="email"
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#020617] border border-gray-600 
            focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 
            py-3 rounded-lg font-semibold 
            hover:scale-[1.05] transition"
          >
            Send Reset Link
          </button>

        </form>

        {/* MESSAGE */}
        {msg && (
          <p className={`text-center mt-4 text-sm 
          ${msg.includes("sent") ? "text-green-400" : "text-red-400"}`}>
            {msg}
          </p>
        )}

      </div>

    </div>
  );
};

export default ForgotPassword;