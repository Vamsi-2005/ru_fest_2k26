import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../assets/images/RU-logo.png";

const eventsList = [
  "Poster Presentation",
  "Paper Presentation",
  "Hackathon",
  "Technical Quiz",
  "Speed Typo",
  "Web Expo",
  "Group Discussion",
];

export default function AdminDashboard() {
  const [selectedEvent, setSelectedEvent] = useState(eventsList[0]);
  const [data, setData] = useState([]);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState(false);

  const emptyForm = {
    name: "",
    roll: "",
    phone: "",
    event: "",
    team_size: 1,
    members: [],
  };

  const [form, setForm] = useState(emptyForm);

  // FETCH
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

  // TEAM SIZE
  const handleTeamSize = (size) => {
    const members = Array.from({ length: size - 1 }, () => ({
      name: "",
      roll: "",
    }));

    setForm((prev) => ({
      ...prev,
      team_size: size,
      members,
    }));
  };

  // INPUT CHANGE
  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // MEMBER CHANGE
  const handleMemberChange = (index, field, value) => {
    setForm((prev) => {
      const updated = [...prev.members];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, members: updated };
    });
  };

  // ADD
  const handleAdd = async (e) => {
    e.preventDefault();

    await supabase.from("registrations").insert([form]);

    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      setShowForm(false);
    }, 1500);

    setForm(emptyForm);
    fetchData();
  };

  // DELETE
  const handleDelete = async (id) => {
    await supabase.from("registrations").delete().eq("id", id);
    fetchData();
  };

  // EXPORT PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.addImage(logo, "PNG", 10, 10, 20, 20);

    doc.setFont("times", "bold");
    doc.setFontSize(18);
    doc.text("RAYALASEEMA UNIVERSITY", pageWidth / 2, 18, { align: "center" });

    doc.setFontSize(12);
    doc.text("COLLEGE OF ENGINEERING - 518007", pageWidth / 2, 25, {
      align: "center",
    });

    doc.line(10, 30, pageWidth - 10, 30);

    doc.text(`${selectedEvent} Registrations`, pageWidth / 2, 38, {
      align: "center",
    });

    const tableData = data.map((u, i) => [
      i + 1,
      u.name,
      u.roll,
      u.phone,
      u.team_size,
      (u.members || []).map(m => `${m.name}(${m.roll})`).join(", "),
    ]);

    autoTable(doc, {
      startY: 45,
      head: [["#", "Name", "Roll", "Phone", "Team", "Members"]],
      body: tableData,
      margin: { left: 10, right: 10 },
      styles: { fontSize: 10 },
    });

    doc.save(`${selectedEvent}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-[80px] flex overflow-x-hidden">

      {/* OVERLAY */}
      {openSidebar && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpenSidebar(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed md:static top-[80px] left-0 h-[calc(100%-80px)] w-64 bg-white shadow z-50
        transform transition duration-300
        ${openSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="p-4 overflow-y-auto h-full">
          <h2 className="font-bold mb-4">Events</h2>

          {eventsList.map((e, i) => (
            <div
              key={i}
              onClick={() => {
                setSelectedEvent(e);
                setOpenSidebar(false);
              }}
              className={`p-3 mb-2 rounded cursor-pointer
              ${selectedEvent === e
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"}`}
            >
              {e}
            </div>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 md:ml-64 px-4 w-full overflow-hidden">

        {/* TOP BAR */}
        <div className="flex flex-wrap justify-between items-center gap-2 mb-4">

          <button
            onClick={() => setOpenSidebar(true)}
            className="md:hidden bg-blue-500 text-white px-3 py-2 rounded"
          >
            ☰
          </button>

          <h1 className="font-bold text-lg">
            {selectedEvent} ({data.length})
          </h1>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add
            </button>

            <button
              onClick={handleExportPDF}
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              Export PDF
            </button>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {data.map((u) => (
            <div
              key={u.id}
              className="bg-white p-4 rounded-2xl shadow-md 
              transition duration-300 ease-in-out
              hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl break-words"
            >
              <p><b>Name:</b> {u.name}</p>
              <p><b>Roll:</b> {u.roll}</p>
              <p><b>Phone:</b> {u.phone}</p>
              <p><b>Team:</b> {u.team_size}</p>

              {u.members?.length > 0 && (
                <p className="text-sm break-words mt-1">
                  <b>Members:</b>{" "}
                  {u.members.map(m => `${m.name}(${m.roll})`).join(", ")}
                </p>
              )}

              <button
                onClick={() => handleDelete(u.id)}
                className="mt-3 bg-red-500 text-white px-3 py-1 rounded-lg 
                hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          ))}

        </div>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

          <div className="bg-white w-[90%] md:max-w-xl p-5 rounded">

            <h2 className="font-bold mb-3">Add Registration</h2>

            {success && (
              <p className="text-green-600 animate-pulse">
                ✅ Submitted Successfully
              </p>
            )}

            <form onSubmit={handleAdd} className="space-y-3">

              <input value={form.name} onChange={(e)=>handleChange("name", e.target.value)} placeholder="Name" className="w-full p-2 border"/>
              <input value={form.roll} onChange={(e)=>handleChange("roll", e.target.value)} placeholder="Roll" className="w-full p-2 border"/>
              <input value={form.phone} onChange={(e)=>handleChange("phone", e.target.value)} placeholder="Phone" className="w-full p-2 border"/>

              <select value={form.event} onChange={(e)=>handleChange("event", e.target.value)} className="w-full p-2 border">
                <option value="">Select Event</option>
                {eventsList.map((e,i)=><option key={i}>{e}</option>)}
              </select>

              <select value={form.team_size} onChange={(e)=>handleTeamSize(Number(e.target.value))} className="w-full p-2 border">
                {[1,2,3,4,5].map(n=><option key={n}>{n}</option>)}
              </select>

              {form.members.map((m,i)=>(
                <div key={i} className="grid grid-cols-2 gap-2">
                  <input value={m.name} onChange={(e)=>handleMemberChange(i,"name",e.target.value)} placeholder="Member Name" className="p-2 border"/>
                  <input value={m.roll} onChange={(e)=>handleMemberChange(i,"roll",e.target.value)} placeholder="Member Roll" className="p-2 border"/>
                </div>
              ))}

              <div className="flex gap-2">
                <button className="flex-1 bg-blue-500 text-white py-2">Submit</button>
                <button type="button" onClick={()=>setShowForm(false)} className="flex-1 bg-gray-300 py-2">Cancel</button>
              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}