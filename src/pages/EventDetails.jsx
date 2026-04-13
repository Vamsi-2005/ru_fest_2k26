import { useParams, Link, useNavigate } from "react-router-dom";
import events from "../data/eventsData";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = events.find((e) => e.id === id);

  if (!event) {
    return <div className="text-white p-10">Event Not Found</div>;
  }

  return (
    <div className="bg-[#020617] text-white min-h-screen">

      {/* HERO */}
      <div className="relative h-[250px] md:h-[300px] w-full">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-center">
          <h1 className="text-3xl md:text-5xl font-bold">
            {event.title}
          </h1>

          <p className="mt-2 text-gray-300">
            {event.date} | {event.location}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="md:col-span-2 space-y-6">

          {/* DESCRIPTION */}
          <div className="bg-[#0f172a] p-6 rounded-xl">
            <h2 className="font-semibold mb-2">Description</h2>
            <p className="text-gray-300">{event.details}</p>
          </div>

          {/* 🔥 RULES (DYNAMIC) */}
          <div className="bg-[#0f172a] p-6 rounded-xl">
            <h2 className="font-semibold mb-3">Rules & Guidelines</h2>

            <ol className="list-decimal list-inside space-y-2 text-gray-300 marker:text-yellow-400">
              {event.rules?.map((rule, i) => (
                <li key={i}>{rule}</li>
              ))}
            </ol>
          </div>

          {/* 🔥 COORDINATORS (DYNAMIC) */}
          <div className="bg-[#0f172a] p-6 rounded-xl">
            <h2 className="font-semibold mb-4 text-center">
              Event Coordinators
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {event.coordinators?.map((c, i) => (
                <div
                  key={i}
                  className={`p-5 rounded-xl text-center 
                  hover:scale-105 hover:shadow-xl transition duration-300
                  ${
                    i % 2 === 0
                      ? "bg-gradient-to-br from-blue-500 to-purple-600"
                      : "bg-gradient-to-br from-pink-500 to-indigo-500"
                  }`}
                >
                  <p className="font-semibold text-lg text-white">
                    {c.name}
                  </p>

                  <p className="text-sm text-white mt-2">
                    📞 {c.phone}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* EVENT DETAILS */}
          <div className="bg-[#0f172a] p-6 rounded-xl">
            <h2 className="font-semibold mb-3">Event Details</h2>

            <p className="text-gray-400 text-sm">Date</p>
            <p className="mb-3">{event.date}</p>

            <p className="text-gray-400 text-sm">Venue</p>
            <p>{event.location}</p>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col gap-4">

            <button
              onClick={() => navigate("/register", { state: { event } })}
              className="w-full bg-yellow-500 text-black py-3 rounded-lg font-semibold 
              hover:bg-yellow-400 transition"
            >
              Register Now →
            </button>

            <Link to="/">
              <button className="w-full border border-gray-500 py-3 rounded-lg hover:bg-gray-700">
                ← Back to Home
              </button>
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default EventDetails;