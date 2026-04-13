import { useEffect, useState } from "react";

const Countdown = () => {
  const targetDate = new Date("2026-04-16T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - new Date().getTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(targetDate - new Date().getTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const days = Math.max(0, Math.floor(timeLeft / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((timeLeft / (1000 * 60 * 60)) % 24));
  const minutes = Math.max(0, Math.floor((timeLeft / (1000 * 60)) % 60));
  const seconds = Math.max(0, Math.floor((timeLeft / 1000) % 60));

  const TimeBox = ({ value, label }) => (
    <div className="group relative rounded-2xl p-[1px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="absolute inset-0 opacity-30 group-hover:opacity-70 blur-lg transition bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

      <div className="relative bg-[#020617] rounded-2xl px-5 py-6 w-20 sm:w-24 md:w-32 flex flex-col items-center shadow-md group-hover:scale-105 transition">
        <span className="text-2xl md:text-4xl font-bold 
        bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 
        bg-clip-text text-transparent">
          {value}
        </span>

        <span className="text-xs text-gray-400 mt-2">{label}</span>
      </div>
    </div>
  );

  return (
    <section id="events" className="bg-[#020617] py-12 text-center">
      <h2 className="text-3xl md:text-4xl mb-8 font-bold 
      bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Event Starts In
      </h2>

      <div className="flex justify-center gap-4 flex-wrap">
        <TimeBox value={days} label="Days" />
        <TimeBox value={hours} label="Hours" />
        <TimeBox value={minutes} label="Minutes" />
        <TimeBox value={seconds} label="Seconds" />
      </div>
    </section>
  );
};

export default Countdown;