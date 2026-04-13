import { CalendarDays, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  return (
    <div
      className="group bg-[#0f172a] rounded-2xl overflow-hidden 
      border border-cyan-500/20 
      shadow-lg hover:shadow-[0_0_25px_rgba(34,211,238,0.2)]
      transition duration-300 hover:scale-[1.03]"
    >

      {/* IMAGE */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover 
          group-hover:scale-110 transition duration-500"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* TITLE ON IMAGE */}
        <h2 className="absolute bottom-4 left-4 text-white text-lg font-semibold">
          {event.title}
        </h2>
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-4">

        {/* DESCRIPTION */}
        <p className="text-gray-300 text-sm leading-relaxed">
          {event.desc}
        </p>

        {/* DATE */}
        <div className="flex items-center gap-2 text-gray-300 text-sm">
          <CalendarDays size={16} className="text-cyan-400" />
          {event.date}
        </div>

        {/* LOCATION */}
        <div className="flex items-center gap-2 text-gray-300 text-sm">
          <MapPin size={16} className="text-pink-400" />
          {event.location}
        </div>

        {/* BUTTON */}
        <button
          onClick={() => navigate(`/events/${event.id}`)}  // 🔥 IMPORTANT
          className="w-full mt-3 py-2 rounded-lg 
          bg-blue-600 hover:bg-blue-700 
          transition duration-300 font-medium"
        >
          View Details
        </button>

      </div>
    </div>
  );
};

export default EventCard;