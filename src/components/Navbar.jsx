import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Contact", path: "contact" }, // 🔥 special case
    { name: "Register", path: "/register" },
    { name: "Admin", path: "/admin" },
  ];

  // 🔥 HANDLE CONTACT CLICK
  const handleContactClick = () => {
    navigate("/"); // go to home first

    setTimeout(() => {
      const section = document.getElementById("contact");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-[#0b1220] border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* LOGO */}
          <Link to="/" className="text-xl font-bold text-white">
            Tech Fusion <span className="text-cyan-400">2K26</span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex gap-8 text-gray-300">
            {links.map((link, i) =>
              link.name === "Contact" ? (
                <button
                  key={i}
                  onClick={handleContactClick}
                  className="relative group"
                >
                  <span className="group-hover:text-cyan-400 transition">
                    {link.name}
                  </span>
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ) : (
                <Link key={i} to={link.path} className="relative group">
                  <span className="group-hover:text-cyan-400 transition">
                    {link.name}
                  </span>
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              )
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white text-3xl"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed top-[70px] left-0 w-full bg-[#020617] border-b border-white/10 z-40 
        transform transition-all duration-500 origin-top
        ${open ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}
        md:hidden`}
      >
        <div className="flex flex-col items-center py-6 gap-6 text-white">

          {links.map((link, i) =>
            link.name === "Contact" ? (
              <button
                key={i}
                onClick={() => {
                  handleContactClick();
                  setOpen(false);
                }}
                className="relative group"
              >
                <span className="group-hover:text-cyan-400 transition">
                  {link.name}
                </span>
              </button>
            ) : (
              <Link
                key={i}
                to={link.path}
                onClick={() => setOpen(false)}
                className="relative group"
              >
                <span className="group-hover:text-cyan-400 transition">
                  {link.name}
                </span>
              </Link>
            )
          )}

        </div>
      </div>
    </>
  );
};

export default Navbar;