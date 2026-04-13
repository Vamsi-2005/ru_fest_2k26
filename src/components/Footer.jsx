import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // HOME
  const handleHome = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  // CONTACT
  const handleContact = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }

    setTimeout(() => {
      const section = document.getElementById("contact");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <footer className="bg-[#020617] text-gray-300 pt-16 pb-8 px-6">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div className="text-center md:text-left animate-fadeInUp">
          <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-4 tracking-wide">
            TECH FUSION 2K26
          </h2>

          <p className="text-gray-400 max-w-md mx-auto md:mx-0">
            The premier technical fest of Rayalaseema University College of
            Engineering — where innovation meets execution.
          </p>
        </div>

        {/* RIGHT */}
        <div className="text-center md:text-left animate-fadeInUp delay-200">
          <h3 className="text-xl font-semibold mb-4 text-white">
            Quick Links
          </h3>

          <ul className="space-y-4">

            {/* LINK STYLE */}
            {[
              { name: "Home", action: handleHome },
              { name: "Events", action: () => navigate("/events") },
              { name: "Contact", action: handleContact },
              { name: "Register", action: () => navigate("/register") },
            ].map((link, i) => (
              <li key={i}>
                <button
                  onClick={link.action}
                  className="relative group text-gray-300 text-lg font-medium 
                  transition duration-300 transform hover:scale-110 hover:text-cyan-400"
                >
                  {link.name}

                  {/* UNDERLINE ANIMATION */}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-cyan-400 
                  transition-all duration-300 group-hover:w-full"></span>

                  {/* GLOW EFFECT */}
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 
                  blur-md bg-cyan-400/20 transition duration-300 rounded-lg"></span>
                </button>
              </li>
            ))}

          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm text-gray-500 animate-fadeInUp delay-300">
        © 2026 RUCE. All rights reserved.
      </div>

      {/* 🔥 CUSTOM ANIMATION */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease forwards;
          }

          .delay-200 {
            animation-delay: 0.2s;
          }

          .delay-300 {
            animation-delay: 0.3s;
          }
        `}
      </style>

    </footer>
  );
};

export default Footer;