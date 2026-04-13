import { FaUser, FaPhone, FaEnvelope } from "react-icons/fa";
import { useRef } from "react";

import hod from "../assets/images/dignitaries/hod.jpg";
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
  {
    name: "V. Satish Kumar",
    role: "Co-ordinator & Assistant Professor(AD HOC)",
    phone: "+91 9866248428",
    email: "valmikisatish71@gmail.com",
    image: hod,
  },
  
];

const DignitarySection = () => {
  return (
    <section className="bg-[#020617] py-16 px-4 min-h-screen">

      {/* TITLE */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-white">
          Dignitaries
        </h1>
        <p className="text-gray-400 mt-3">
          Meet our respected leaders
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {dignitaries.map((d, index) => (
          <TiltCard key={index} data={d} />
        ))}

      </div>

      {/* 🔥 NEON + TILT STYLES */}
      <style>{`
        .neon-border {
          position: relative;
        }

        .neon-border::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 16px;
          background: linear-gradient(45deg, #00f0ff, #ff00ff, #00ff88);
          z-index: -1;
          filter: blur(10px);
          opacity: 0;
          transition: 0.4s;
        }

        .neon-border:hover::before {
          opacity: 1;
        }
      `}</style>

    </section>
  );
};

export default DignitarySection;



// 🔥 3D TILT CARD COMPONENT
const TiltCard = ({ data }) => {
  const cardRef = useRef();

  const handleMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateX = ((y - midY) / midY) * 8;
    const rotateY = ((x - midX) / midX) * -8;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const handleLeave = () => {
    cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      className="neon-border rounded-2xl"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div
        ref={cardRef}
        className="bg-[#1e293b] rounded-2xl p-6 flex flex-col items-center text-center 
        transition duration-300 shadow-lg"
      >

        {/* IMAGE */}
        <div className="w-28 h-28 rounded-full border-4 border-cyan-400 
        overflow-hidden shadow-lg mb-4">
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* NAME */}
        <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
          <FaUser className="text-gray-400" />
          {data.name}
        </h2>

        {/* ROLE */}
        <p className="text-gray-400 mt-2">
          {data.role}
        </p>

        {/* PHONE */}
        {data.phone && (
          <p className="flex items-center gap-2 mt-3 text-sm text-gray-300">
            <FaPhone />
            {data.phone}
          </p>
        )}

        {/* EMAIL */}
        {data.email && (
          <p className="flex items-center gap-2 mt-1 text-sm text-gray-300 break-all">
            <FaEnvelope />
            {data.email}
          </p>
        )}

      </div>
    </div>
  );
};