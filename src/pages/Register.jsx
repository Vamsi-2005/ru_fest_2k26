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

  // 🔹 INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 TEAM SIZE CHANGE
  const handleTeamSize = (size) => {
    setTeamSize(size);

    const newMembers = Array.from({ length: size - 1 }, () => ({
      name: "",
      roll: "",
    }));

    setMembers(newMembers);
  };

  // 🔹 MEMBER INPUT
  const handleMemberChange = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  // 🔹 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    // BASIC VALIDATION
    if (!form.name || !form.roll || !form.phone || !form.event) {
      setMsg("All fields are required ❌");
      return;
    }

    if (form.phone.length !== 10) {
      setMsg("Phone must be 10 digits ❌");
      return;
    }

    // 🔥 TEAM VALIDATION (MAIN FIX)
    if (teamSize > 1) {
      for (let i = 0; i < members.length; i++) {
        if (!members[i].name || !members[i].roll) {
          setMsg(`Fill all details for Member ${i + 1} ❌`);
          return;
        }
      }
    }

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
            members: members, // ✅ full members only
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
            members: members,
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

      <div className="w-full max-w-3xl bg-white text-black p-6 rounded-3xl shadow-2xl 
      transition duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] 
      hover:scale-[1.01] animate-fadeIn">

        <h1 className="text-2xl font-bold text-center mb-6">
          🎯 Event Registration
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-3 rounded-xl border"
          />

          <input
            type="text"
            name="roll"
            placeholder="Roll Number"
            onChange={handleChange}
            className="w-full p-3 rounded-xl border"
          />

          <input
            type="number"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full p-3 rounded-xl border"
          />

          <select
            name="event"
            onChange={handleChange}
            className="w-full p-3 rounded-xl border"
          >
            <option value="">Select Event</option>
            {eventsList.map((e, i) => (
              <option key={i}>{e}</option>
            ))}
          </select>

          {/* TEAM SIZE */}
          <select
            value={teamSize}
            onChange={(e) => handleTeamSize(Number(e.target.value))}
            className="w-full p-3 rounded-xl border"
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
              <p className="text-sm mb-2">Team Members</p>

              {members.map((m, i) => (
                <div key={i} className="grid grid-cols-2 gap-2 mb-2">

                  <input
                    value={m.name}
                    placeholder={`Member ${i + 1} Name`}
                    className="p-2 rounded-xl border"
                    onChange={(e) =>
                      handleMemberChange(i, "name", e.target.value)
                    }
                  />

                  <input
                    value={m.roll}
                    placeholder="Roll Number"
                    className="p-2 rounded-xl border"
                    onChange={(e) =>
                      handleMemberChange(i, "roll", e.target.value)
                    }
                  />

                </div>
              ))}
            </div>
          )}

          {/* ERROR */}
          {msg && (
            <p className="text-center text-sm text-red-500">
              {msg}
            </p>
          )}

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-xl 
            hover:scale-[1.05] transition"
          >
            {loading ? "Submitting..." : "Complete Registration"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default Register;