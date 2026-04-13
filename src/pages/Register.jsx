import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const eventsList = [
  "Poster Presentation",
  "Paper Presentation",
  "Hackathon",
  "Technical Quiz",
  "Speed Typo",
  "Web Expo",
  "Group Discussion",
];

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    roll: "",
    phone: "",
    event: "",
  });

  const [teamSize, setTeamSize] = useState(1);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // 🔹 Handle inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Team members
  const handleMemberChange = (index, field, value) => {
    const updated = [...members];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setMembers(updated);
  };

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!form.name || !form.roll || !form.phone || !form.event) {
      setMsg("All fields are required ❌");
      return;
    }

    if (form.phone.length !== 10) {
      setMsg("Phone must be 10 digits ❌");
      return;
    }

    const teamMembers = members.filter(
      (m) => m?.name && m?.roll
    );

    try {
      setLoading(true);

      const { error } = await supabase
        .from("registrations")
        .insert([
          {
            name: form.name,
            roll: form.roll,
            phone: form.phone,
            event: form.event,
            team_size: teamSize,
            members: teamMembers,
          },
        ]);

      if (error) {
        console.log(error);
        setMsg("Error submitting form ❌");
      } else {
        navigate("/confirmation", {
          state: {
            ...form,
            team_size: teamSize,
            members: teamMembers,
          },
        });
      }

    } catch (err) {
      console.log(err);
      setMsg("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] to-[#0f172a] flex items-center justify-center px-4 py-10">

      {/* 🔥 CARD */}
      <div className="w-full max-w-3xl bg-white text-black p-6 rounded-3xl shadow-2xl 
      transition duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] 
      hover:scale-[1.01] animate-fadeIn">

        <h1 className="text-2xl font-bold text-center mb-6">
          🎯 Event Registration
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 
            focus:ring-2 focus:ring-blue-500 outline-none 
            transition duration-300 hover:border-blue-400"
          />

          {/* ROLL */}
          <input
            type="text"
            name="roll"
            placeholder="Roll Number"
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 
            focus:ring-2 focus:ring-blue-500 outline-none 
            transition duration-300 hover:border-blue-400"
          />

          {/* PHONE */}
          <input
            type="number"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 
            focus:ring-2 focus:ring-blue-500 outline-none 
            transition duration-300 hover:border-blue-400"
          />

          {/* EVENT */}
          <select
            name="event"
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 
            focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select Event</option>
            {eventsList.map((e, i) => (
              <option key={i}>{e}</option>
            ))}
          </select>

          {/* TEAM SIZE */}
          <select
            value={teamSize}
            onChange={(e) => setTeamSize(Number(e.target.value))}
            className="w-full p-3 rounded-xl border border-gray-300 
            focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {[1,2,3,4,5].map((n) => (
              <option key={n} value={n}>
                Team Size: {n}
              </option>
            ))}
          </select>

          {/* TEAM MEMBERS */}
          {teamSize > 1 && (
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Team Members
              </p>

              {[...Array(teamSize - 1)].map((_, i) => (
                <div key={i} className="grid grid-cols-2 gap-2 mb-2">

                  <input
                    placeholder={`Member ${i + 1} Name`}
                    className="p-2 rounded-xl border border-gray-300 
                    focus:ring-2 focus:ring-blue-500 outline-none"
                    onChange={(e) =>
                      handleMemberChange(i, "name", e.target.value)
                    }
                  />

                  <input
                    placeholder="Roll Number"
                    className="p-2 rounded-xl border border-gray-300 
                    focus:ring-2 focus:ring-blue-500 outline-none"
                    onChange={(e) =>
                      handleMemberChange(i, "roll", e.target.value)
                    }
                  />

                </div>
              ))}
            </div>
          )}

          {/* MESSAGE */}
          {msg && (
            <p className="text-center text-sm text-red-500">
              {msg}
            </p>
          )}

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-xl font-semibold 
            hover:scale-[1.05] hover:shadow-lg transition duration-300 active:scale-95"
          >
            {loading ? "Submitting..." : "Complete Registration"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default Register;