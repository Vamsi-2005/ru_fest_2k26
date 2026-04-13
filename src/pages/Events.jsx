import events from "../data/eventsData";
import EventCard from "../components/EventCard";

const Events = () => {
  return (
    <section className="min-h-screen bg-[#020617] text-white px-4 md:px-6 pt-[80px] pb-10">

      {/* TITLE */}
      <h1 className="text-4xl md:text-5xl text-center font-bold mb-8 
      bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
        Events
      </h1>

      {/* GRID */}
      <div className="grid gap-8 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4">

        {events.map((event) => (
          <div
            key={event.id}
            className="w-[90%] mx-auto sm:w-full"
          >
            <EventCard event={event} />
          </div>
        ))}

      </div>
    </section>
  );
};

export default Events;