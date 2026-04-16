import { useState, useEffect } from "react";
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

  // 🔥 DEADLINE
  const deadline = new Date("2026-04-16T18:30:00");

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isClosed = time > deadline;

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTeamSize = (size) => {
    setTeamSize(size);
    const newMembers = Array.from({ length: size - 1 }, () => ({
      name: "",
      roll: "",
    }));
    setMembers(newMembers);
  };

  const handleMemberChange = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isClosed) {
      setMsg("Registration Closed ❌");
      return;
    }

    if (!form.name || !form.roll || !form.phone || !form.event) {
      setMsg("All fields are required ❌");
      return;
    }

    if (form.phone.length !== 10) {
      setMsg("Phone must be 10 digits ❌");
      return;
    }

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
            members: members,
          },
        ]);

      if (error) {
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
      setMsg("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-3xl">

        <h1 className="text-3xl font-bold text-center text-white mb-6">
          🎯 Event Registration
        </h1>

        {/* 🔥 PREMIUM CLOSED UI */}
        {isClosed ? (
          <div className="flex justify-center">

            <div className="relative w-full max-w-md p-[2px] rounded-3xl 
            bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 animate-pulse">

              <div className="bg-[#020617]/80 backdrop-blur-xl p-8 rounded-3xl text-center shadow-2xl">

                <div className="text-5xl mb-3 animate-bounce">
                  🎉
                </div>

                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-300 to-emerald-500 
                bg-clip-text text-transparent">
                  Registration Completed
                </h2>

                <p className="text-gray-300 mt-2 text-sm">
                  Thank you for your interest 🚀 <br />
                  Registrations are now closed.
                </p>

                <div className="mt-4 text-xs text-gray-400">
                  See you at Tech Fusion 2K26 💙
                </div>

              </div>

            </div>

          </div>
        ) : (
          <div className="bg-white text-black p-6 rounded-3xl shadow-2xl">

            <form onSubmit={handleSubmit} className="space-y-4">

              <input name="name" placeholder="Full Name" onChange={handleChange}
                className="w-full p-3 rounded-xl border" />

              <input name="roll" placeholder="Roll Number" onChange={handleChange}
                className="w-full p-3 rounded-xl border" />

              <input name="phone" placeholder="Phone Number" onChange={handleChange}
                className="w-full p-3 rounded-xl border" />

              <select name="event" onChange={handleChange}
                className="w-full p-3 rounded-xl border">
                <option value="">Select Event</option>
                {eventsList.map((e, i) => (
                  <option key={i}>{e}</option>
                ))}
              </select>

              <select value={teamSize}
                onChange={(e) => handleTeamSize(Number(e.target.value))}
                className="w-full p-3 rounded-xl border">
                {[1,2,3,4,5].map((n) => (
                  <option key={n}>Team Size: {n}</option>
                ))}
              </select>

              {teamSize > 1 && members.map((m, i) => (
                <div key={i} className="grid grid-cols-2 gap-2">
                  <input placeholder={`Member ${i+1} Name`}
                    className="p-2 rounded-xl border"
                    onChange={(e)=>handleMemberChange(i,"name",e.target.value)} />
                  <input placeholder="Roll"
                    className="p-2 rounded-xl border"
                    onChange={(e)=>handleMemberChange(i,"roll",e.target.value)} />
                </div>
              ))}

              {msg && <p className="text-red-500 text-sm text-center">{msg}</p>}

              <button
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-xl 
                hover:scale-105 transition duration-300"
              >
                {loading ? "Submitting..." : "Complete Registration"}
              </button>

            </form>

          </div>
        )}

      </div>

    </div>
  );
};

export default Register;