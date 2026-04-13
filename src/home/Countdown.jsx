import { useEffect, useState } from "react";

const Countdown = () => {
  const targetDate = new Date("2026-04-16T00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState(
    targetDate - new Date().getTime()
  );

  const colors = [
    "text-blue-400",
    "text-purple-400",
    "text-pink-400",
    "text-cyan-400",
    "text-indigo-400",
  ];

  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      setTimeLeft(targetDate - now);
      setColorIndex((prev) => (prev + 1) % colors.length);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const days = Math.max(0, Math.floor(timeLeft / (1000 * 60 * 60 * 24)));
  const hours = Math.max(
    0,
    Math.floor((timeLeft / (1000 * 60 * 60)) % 24)
  );
  const minutes = Math.max(
    0,
    Math.floor((timeLeft / (1000 * 60)) % 60)
  );
  const seconds = Math.max(0, Math.floor((timeLeft / 1000) % 60));

  const TimeBox = ({ value, label }) => (
    <div className="group relative">
      
      {/* Glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-xl group-hover:opacity-60 transition duration-500"></div>

      <div
        className="
        relative z-10
        flex flex-col items-center justify-center
        bg-[#020617]/80 backdrop-blur-md
        border border-white/10
        shadow-lg
        
        w-[50px] h-[50px]        /* 📱 Mobile */
        sm:w-24 sm:h-24
        md:w-32 md:h-32
        
        rounded-lg
        
        transform transition duration-300 ease-in-out
        group-hover:scale-105 group-hover:-translate-y-1
      "
      >
        {/* Number */}
        <span
          className={`
            font-bold
            text-lg sm:text-2xl md:text-4xl   /* adjusted for 50px */
            transition-colors duration-500
            ${colors[colorIndex]}
          `}
        >
          {value}
        </span>

        {/* Label */}
        <span className="text-[8px] sm:text-xs text-gray-400 mt-[2px]">
          {label}
        </span>
      </div>
    </div>
  );

  return (
    <section
      id="events"
      className="bg-[#020617] py-14 text-center relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-purple-500 opacity-10 blur-3xl"></div>

      <h2
        className="
        text-2xl md:text-4xl mb-8 font-bold
        bg-gradient-to-r from-purple-400 to-pink-400
        bg-clip-text text-transparent
      "
      >
        Event Starts In
      </h2>

      <div className="flex justify-center gap-2 sm:gap-4 flex-wrap">
        <TimeBox value={days} label="Days" />
        <TimeBox value={hours} label="Hours" />
        <TimeBox value={minutes} label="Min" />
        <TimeBox value={seconds} label="Sec" />
      </div>
    </section>
  );
};

export default Countdown;