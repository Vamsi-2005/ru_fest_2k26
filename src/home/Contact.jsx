import { Mail, Phone, User } from "lucide-react";
import facultyImg from "../assets/images/dignitaries/hod.jpg";

const Contact = () => {
  return (
    <section id="contact" className="bg-[#020617] py-16 text-white px-4">

      {/* TITLE */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 
      bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
        Contact Us
      </h1>

      {/* ================= FACULTY ================= */}
      <div className="mb-16 flex flex-col items-center">

        <h2 className="text-2xl text-cyan-400 mb-6 font-semibold">
          Faculty Coordinator
        </h2>

        {/* WIDTH */}
        <div className="w-full md:w-[50%] flex justify-center">

          <div className="relative w-full p-[2px] rounded-2xl 
          bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500">

            {/* CARD */}
            <div className="bg-[#1e293b] rounded-2xl 
            h-auto md:h-[230px] 
            flex items-center gap-8 px-8 py-6 md:py-0
            hover:bg-[#243044] 
            transition-all duration-300 
            hover:scale-[1.05] 
            hover:shadow-[0_0_40px_rgba(168,85,247,0.6)]">

              {/* IMAGE */}
              <img
                src={facultyImg}
                alt="faculty"
                className="w-28 h-28 md:w-32 md:h-32 rounded-full 
                border-2 border-cyan-400 object-cover"
              />

              {/* CONTENT */}
              <div className="flex flex-col justify-center leading-relaxed">

                <h3 className="text-xl md:text-2xl font-semibold flex items-center gap-3">
                  <User size={22}/> V. Satish Kumar
                </h3>

                <p className="text-gray-400 text-base md:text-lg mt-2">
                  Co-ordinator & Assistant Professor(AD HOC)
                </p>

                <p className="flex items-center gap-3 mt-4 text-base md:text-lg">
                  <Phone size={18}/> +91 9866248428
                </p>

                <p className="flex items-center gap-3 text-base md:text-lg">
                  <Mail size={18}/> hod.cse@ruce.ac.in
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= STUDENT SECRETARIES ================= */}
      <div className="mb-16">

        <h2 className="text-2xl text-purple-400 text-center mb-8 font-semibold">
          Student Convenor
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {[
            {
              name: "P. Lakshmi Lokesh",
              role: "CSE • 23RU1A0580",
              phone: "+91 8106203114",
              mail: "23ru1a0580@ruce.ac.in",
            },
            {
              name: "Yeddula Sunil",
              role: "AI • 24RU1A0609",
              phone: "+91 6309959320",
              mail: "24ru1a0609@ruce.ac.in",
            },
            {
              name: "L. Ashwini",
              role: "AI • 23RU1A0612",
              phone: "+91 7989196507",
              mail: "ashwiniroyal30@gmail.com",
            },
            {
              name: "Kondreddy Dhathri",
              role: "AI • 23RU1A0608",
              phone: "+91 9676423240",
              mail: "dhathrireddy364@gmail.com",
            },
            {
              name: "D.Jamalbee",
              role: "CSE • 23RU1A0527",
              phone: "+91 8019351294",
              mail: "23ru1a0527@ruce.ac.in",
            },
            {
              name: "K.Sai Nikhitha",
              role: "CSE • 24RU1A0507",
              phone: "+91 8886886529",
              mail: "24ru1a0507@ruce.ac.in",
            },
            
          ].map((item, i) => (
            <div
              key={i}
              className="relative p-[1px] rounded-2xl 
              bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500 
              hover:scale-[1.03] transition duration-300"
            >
              <div className="bg-[#1e293b] rounded-2xl p-6 
              text-center hover:bg-[#243044] transition">

                <h3 className="text-xl font-semibold">{item.name}</h3>

                <p className="text-green-400 text-base">{item.role}</p>

                <p className="flex items-center justify-center gap-2 mt-2 text-gray-300 text-base">
                  <Phone size={16}/> {item.phone}
                </p>

                <p className="flex items-center justify-center gap-2 text-gray-300 text-base">
                  <Mail size={16}/> {item.mail}
                </p>

              </div>
            </div>
          ))}

        </div>
      </div>

    </section>
  );
};

export default Contact;