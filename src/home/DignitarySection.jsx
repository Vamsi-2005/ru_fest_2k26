import { FaUser, FaPhone, FaEnvelope } from "react-icons/fa";
import { useRef } from "react";

import principal from "../assets/images/dignitaries/principal.jpg";
import registrar from "../assets/images/dignitaries/registrar.jpg";
import vc from "../assets/images/dignitaries/vicechancellor.jpg";
import rector from "../assets/images/dignitaries/rector.jpg";

const dignitaries = [
  {
    name: "Prof. V. Venkata Basava Rao",
    role: "Hon'ble Vice Chancellor",
    phone: "",
    email: "",
    image: vc,
  },
  {
    name: "Prof. N.T.K. Naik",
    role: "Rector & Professor of Economics",
    phone: "",
    email: "",
    image: rector,
  },
  {
    name: "Dr. B. Vijaya Kumar Naidu",
    role: "Registrar • Rayalaseema University",
    phone: "",
    email: "",
    image: registrar,
  },
  {
    name: "Prof. Venkata Sundaranand Putcha",
    role: "Principal • Engineering College",
    phone: "+91 9848226855",
    email: "anand_putcha@yahoo.com",
    image: principal,
  },
];

const DignitarySection = () => {
  return (
    <section className="bg-[#020617] py-16 px-4 min-h-screen overflow-hidden">

      {/* TITLE */}
      <div className="text-center mb-12 animate-fadeUp">
        <h1 className="text-3xl md:text-5xl font-bold text-white">
          Dignitaries
        </h1>
        <p className="text-gray-400 mt-3">
          Meet our respected leaders
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto flex flex-col items-center sm:grid sm:grid-cols-2 gap-6 md:gap-8">
        {dignitaries.map((d, index) => (
          <div
            key={index}
            className="w-[90%] mx-auto sm:w-full flex justify-center"
          >
            <TiltCard data={d} index={index} />
          </div>
        ))}
      </div>

      {/* STYLES */}
      <style>{`
        .animate-fadeUp {
          animation: fadeUp 0.8s ease forwards;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .card-enter {
          opacity: 0;
          transform: translateY(40px);
          animation: fadeUp 0.8s ease forwards;
        }

        .neon-border {
          position: relative;
        }

        .neon-border::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 16px;
          background: linear-gradient(270deg, #00f0ff, #ff00ff, #00ff88);
          background-size: 600% 600%;
          z-index: -1;
          filter: blur(8px);
          opacity: 0;
          transition: 0.4s;
          animation: gradientMove 6s ease infinite;
        }

        .neon-border:hover::before {
          opacity: 1;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

    </section>
  );
};

export default DignitarySection;


// 🔥 TILT CARD
const TiltCard = ({ data, index }) => {
  const cardRef = useRef();

  const handleMove = (e) => {
    if (window.innerWidth < 640) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateX = ((y - midY) / midY) * 5;
    const rotateY = ((x - midX) / midX) * -5;

    card.style.transform = `
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      scale(1.05)
    `;
  };

  const handleLeave = () => {
    const card = cardRef.current;
    card.style.transition = "transform 0.4s ease";
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  };

  return (
    <div
      className="neon-border rounded-2xl card-enter w-full"
      style={{ animationDelay: `${index * 0.2}s` }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div
        ref={cardRef}
        className="
        bg-[#1e293b]/80 backdrop-blur-md
        rounded-2xl
        p-5 md:p-6
        flex flex-col items-center text-center
        transition duration-300
        shadow-lg
        hover:shadow-2xl hover:scale-[1.03]
      "
      >

        {/* IMAGE */}
        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-cyan-400 
        overflow-hidden shadow-lg mb-4 hover:scale-110 transition duration-300">
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* NAME */}
        <h2 className="text-base md:text-xl font-bold text-white flex items-center gap-2">
          <FaUser className="text-gray-400" />
          {data.name}
        </h2>

        {/* ROLE */}
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          {data.role}
        </p>

        {/* PHONE */}
        {data.phone && (
          <p className="flex items-center gap-2 mt-3 text-xs md:text-sm text-gray-300">
            <FaPhone />
            {data.phone}
          </p>
        )}

        {/* EMAIL */}
        {data.email && (
          <p className="flex items-center gap-2 mt-1 text-xs md:text-sm text-gray-300 break-all">
            <FaEnvelope />
            {data.email}
          </p>
        )}

      </div>
    </div>
  );
};