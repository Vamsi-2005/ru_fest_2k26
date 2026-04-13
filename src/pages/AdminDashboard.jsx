import { useEffect, useState } from "react";
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

const AdminDashboard = () => {
  const [selectedEvent, setSelectedEvent] = useState(eventsList[0]);
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    roll: "",
    phone: "",
    event: "",
    team_size: 1,
    members: [],
  });

  // 🔥 FETCH DATA
  const fetchData = async () => {
    const { data } = await supabase
      .from("registrations")
      .select("*")
      .eq("event", selectedEvent);

    setData(data || []);
  };

  useEffect(() => {
    fetchData();
  }, [selectedEvent]);

  const totalCount = data.length;

  // 👥 TEAM SIZE
  const handleTeamSize = (size) => {
    const members = Array.from({ length: size - 1 }, () => ({
      name: "",
      roll: "",
    }));

    setForm({
      ...form,
      team_size: size,
      members,
    });
  };

  // ➕ ADD
  const handleAdd = async (e) => {
    e.preventDefault();

    if (!form.event) {
      alert("Select event ❌");
      return;
    }

    await supabase.from("registrations").insert([form]);

    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      setShowForm(false);
    }, 2000);

    setForm({
      name: "",
      roll: "",
      phone: "",
      event: "",
      team_size: 1,
      members: [],
    });

    fetchData();
  };

  // ❌ DELETE
  const handleDelete = async (id) => {
    await supabase.from("registrations").delete().eq("id", id);
    fetchData();
  };

  // 📤 EXPORT CSV
  const handleExport = () => {
    const csv = [
      ["Name", "Roll", "Phone", "Event", "Team", "Members"],
      ...data.map((u) => [
        u.name,
        u.roll,
        u.phone,
        u.event,
        u.team_size,
        (u.members || [])
          .map((m) => `${m.name}(${m.roll})`)
          .join("|"),
      ]),
    ]
      .map((r) => r.join(","))
      .join("\n");

    const blob = new Blob([csv]);
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedEvent}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20 flex">

      {/* SIDEBAR (Desktop) */}
      <div className="hidden md:block w-64 bg-white shadow p-4">
        <h2 className="text-xl font-bold mb-4">Events</h2>

        {eventsList.map((event, i) => (
          <div
            key={i}
            onClick={() => setSelectedEvent(event)}
            className={`p-3 rounded-lg mb-2 cursor-pointer transition 
            ${
              selectedEvent === event
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            {event}
          </div>
        ))}
      </div>

      {/* MAIN */}
      <div className="flex-1 p-4 md:p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">

          {/* MOBILE EVENT SELECT */}
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="md:hidden p-3 border rounded-xl bg-white"
          >
            {eventsList.map((ev, i) => (
              <option key={i}>{ev}</option>
            ))}
          </select>

          {/* TITLE + COUNT */}
          <h1 className="hidden md:flex items-center gap-3 font-bold text-lg">
            {selectedEvent}
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
              {totalCount} Registered
            </span>
          </h1>

          {/* BUTTONS */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-xl hover:scale-105 transition"
            >
              + Add
            </button>

            <button
              onClick={handleExport}
              className="bg-yellow-400 px-4 py-2 rounded-xl hover:scale-105 transition"
            >
              Export
            </button>
          </div>

        </div>

        {/* MOBILE COUNT */}
        <p className="md:hidden text-center font-semibold mb-2">
          {selectedEvent} — {totalCount} Registered
        </p>

        {/* CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

          {data.map((u) => (
            <div
              key={u.id}
              className="bg-white p-4 rounded-2xl border shadow 
              flex flex-col justify-between min-h-[220px]
              hover:shadow-xl hover:-translate-y-1 transition"
            >

              <div className="text-sm space-y-1">
                <p><b>Name:</b> {u.name}</p>
                <p><b>Roll:</b> {u.roll}</p>
                <p><b>Phone:</b> {u.phone}</p>
                <p><b>Team:</b> {u.team_size}</p>

                {u.members?.length > 0 && (
                  <p className="text-xs text-gray-600">
                    <b>Members:</b>{" "}
                    {u.members.map((m) => `${m.name}(${m.roll})`).join(", ")}
                  </p>
                )}
              </div>

              {/* ONLY DELETE BUTTON */}
              <div className="flex justify-center mt-3">
                <button
                  onClick={() => handleDelete(u.id)}
                  className="bg-red-500 text-white px-3 py-1 text-xs rounded-lg hover:scale-110 transition"
                >
                  Delete
                </button>
              </div>

            </div>
          ))}

        </div>

      </div>

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white w-full max-w-xl mx-3 p-5 rounded-xl">

            <h2 className="font-bold mb-3">Add Registration</h2>

            {success && (
              <div className="bg-green-500 text-white p-2 rounded mb-3 animate-pulse text-center">
                Submitted Successfully ✅
              </div>
            )}

            <form onSubmit={handleAdd} className="space-y-3">

              <input
                placeholder="Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-2 border rounded"
              />

              <input
                placeholder="Roll"
                required
                value={form.roll}
                onChange={(e) => setForm({ ...form, roll: e.target.value })}
                className="w-full p-2 border rounded"
              />

              <input
                placeholder="Phone"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full p-2 border rounded"
              />

              <select
                value={form.event}
                onChange={(e) => setForm({ ...form, event: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Event</option>
                {eventsList.map((e, i) => (
                  <option key={i}>{e}</option>
                ))}
              </select>

              <select
                value={form.team_size}
                onChange={(e) => handleTeamSize(Number(e.target.value))}
                className="w-full p-2 border rounded"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>

              {form.team_size > 1 &&
                form.members.map((m, i) => (
                  <div key={i} className="grid grid-cols-2 gap-2">
                    <input
                      placeholder="Name"
                      value={m.name}
                      onChange={(e) => {
                        const arr = [...form.members];
                        arr[i].name = e.target.value;
                        setForm({ ...form, members: arr });
                      }}
                      className="p-2 border rounded"
                    />

                    <input
                      placeholder="Roll"
                      value={m.roll}
                      onChange={(e) => {
                        const arr = [...form.members];
                        arr[i].roll = e.target.value;
                        setForm({ ...form, members: arr });
                      }}
                      className="p-2 border rounded"
                    />
                  </div>
                ))}

              <div className="flex gap-2">
                <button className="flex-1 bg-blue-500 text-white py-2 rounded">
                  Submit
                </button>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-300 py-2 rounded"
                >
                  Cancel
                </button>
              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default AdminDashboard;