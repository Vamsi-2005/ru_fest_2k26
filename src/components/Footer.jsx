const Footer = () => {
  return (
    <footer className="bg-[#020617] text-gray-300 pt-16 pb-8 px-6">

      {/* TOP */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-4 
          drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
            TECK FUSION 2K26
          </h2>

          <p className="text-gray-400 max-w-md mx-auto md:mx-0">
            The premier technical fest of Rayalaseema University College of
            Engineering — where innovation meets execution.
          </p>
        </div>

        {/* RIGHT */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold mb-4 text-white">
            Quick Links
          </h3>

          <ul className="space-y-3">
            {["Home", "Events", "Contact", "Register"].map((link, i) => (
              <li key={i}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="inline-block transition duration-300 hover:text-cyan-400 hover:translate-x-2"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm text-gray-500">
        © 2026 Rayalaseema University College of Engineering. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;