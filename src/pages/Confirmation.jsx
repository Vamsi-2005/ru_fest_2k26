import { useLocation, Link } from "react-router-dom";

const Confirmation = () => {
  const location = useLocation();

  const data = location.state || {};

  const {
    name = "N/A",
    roll = "N/A",
    phone = "N/A",
    event = "N/A",
    team_size = 1,
    members = [],
  } = data;

  // 🔥 EVENT → WHATSAPP LINKS (MATCH EXACT TITLES)
  const eventLinks = {
    "Poster Presentation":
      "https://chat.whatsapp.com/Dv0FNrUqc2J2t4Pnf9esbl?mode=gi_t",

    "Paper Presentation":
      "https://chat.whatsapp.com/CjOmR95KB1sD0B8zTPSOtf?mode=gi_t",

    "Hackathon":
      "https://chat.whatsapp.com/EvcfGpvXGlkKPm62sgQY4e",

    "Technical Quiz":
      "https://chat.whatsapp.com/Lj74r8ofUjj8Shz2d8SO0T",

    "Speed Typo":
      "https://chat.whatsapp.com/HPhF7SsndzgFighCX9QFJh?mode=gi_t",

    "Web Expo":
      "https://chat.whatsapp.com/IMOLqXfVZZnC3EWz1R5YDT?mode=gi_t",

    "Group Discussion":
      "https://chat.whatsapp.com/Kpb9NSGD7rOFv8Ex01EJcY?mode=gi_t",
  };

  // 🔥 GET LINK
  const joinLink = eventLinks[event];

  return (
    <div className="min-h-screen bg-[#f1f5f9] pt-28 pb-10 px-4 flex justify-center">
      <div className="w-full max-w-xl">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white py-6 rounded-xl text-center shadow-lg">
          <h1 className="text-2xl md:text-3xl font-bold">
            🎉 Registration Complete
          </h1>
        </div>

        {/* CARD */}
        <div className="bg-white mt-6 rounded-2xl shadow-xl p-5 sm:p-6 transition hover:shadow-2xl">

          {/* SUCCESS */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-3 animate-bounce">
              <span className="text-3xl text-green-600">✔</span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
              Successfully Registered!
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Your registration details are below
            </p>
          </div>

          {/* DETAILS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Full Name</p>
              <p className="font-semibold">{name}</p>
            </div>

            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Roll Number</p>
              <p className="font-semibold">{roll}</p>
            </div>

            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Phone</p>
              <p className="font-semibold">{phone}</p>
            </div>

            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Event</p>
              <p className="font-semibold">{event}</p>
            </div>

            <div className="bg-gray-100 p-3 rounded-lg sm:col-span-2">
              <p className="text-xs text-gray-500">Team Size</p>
              <p className="font-semibold">{team_size}</p>
            </div>

          </div>

          {/* TEAM MEMBERS */}
          {team_size > 1 && members.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-3 text-gray-700">
                Team Members
              </h3>

              <div className="space-y-2">
                {members.map((m, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 p-3 rounded-lg flex justify-between"
                  >
                    <p>{m.name}</p>
                    <p>{m.roll}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 🔥 JOIN WHATSAPP */}
          {joinLink ? (
            <div className="mt-6">
              <a href={joinLink} target="_blank" rel="noreferrer">
                <button className="w-full py-3 rounded-lg font-semibold text-white 
                bg-gradient-to-r from-green-500 to-emerald-600
                hover:from-green-400 hover:to-emerald-500
                shadow-lg hover:shadow-green-400/40
                transition duration-300 hover:scale-[1.04] active:scale-95">

                  💬 Join {event} WhatsApp Group

                </button>
              </a>
            </div>
          ) : (
            <p className="text-center text-red-500 mt-4 text-sm">
              ⚠️ No WhatsApp group link available
            </p>
          )}

          {/* BUTTONS */}
          <div className="mt-6 flex flex-col gap-3">

            <Link to="/">
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition hover:scale-[1.03]">
                🏠 Back to Home
              </button>
            </Link>

            <Link to="/events">
              <button className="w-full border border-gray-400 py-3 rounded-lg hover:bg-gray-200 transition hover:scale-[1.03]">
                🔙 Explore Events
              </button>
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Confirmation;