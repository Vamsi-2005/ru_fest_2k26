import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import heroBg from "../assets/images/RU-logo.png"; // ✅ FIXED IMPORT

const Hero = () => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: Math.random() * 1 - 0.5,
        dy: Math.random() * 1 - 0.5,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        ctx.fillStyle = "#00ffff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    draw();
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center bg-[#020617] overflow-hidden px-4">

      {/* Background */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Logo */}
        <img
          src={heroBg}   // ✅ FIXED HERE
          alt="logo"
          className="w-16 md:w-24 mb-4 object-contain"
        />

        {/* University */}
        <p className="text-cyan-400 tracking-widest mb-2 text-sm md:text-lg">
          Rayalaseema University College of Engineering
        </p>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold animate-float-soft">
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            TECH FUSION
          </span>
        </h1>

        <h2 className="text-4xl md:text-6xl font-bold mt-2 animate-float-soft delay-200">
          <span className="bg-gradient-to-r from-green-400 via-yellow-400 to-lime-400 bg-clip-text text-transparent">
            2k26
          </span>
        </h2>

        {/* Tagline */}
        <p className="text-green-400 italic mt-6 text-sm md:text-lg">
          Ignite Your Potential, Where Knowledge Takes Flight
        </p>

        {/* Dept */}
        <p className="text-gray-400 mt-6 text-sm md:text-base">
          Department of <br />
          <span className="font-semibold">
            Computer Science and Engineering & Artificial Intelligence
          </span>
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/register")}
          className="mt-8 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition"
        >
          Register Now →
        </button>

      </div>
    </section>
  );
};

export default Hero;