import Hero from "../home/Hero";
import Countdown from "../home/Countdown";
import DignitarySection from "../home/DignitarySection";
import Contact from "../home/Contact";

const Home = () => {
  return (
    <main className="bg-[#020617] text-white">

      {/* HERO */}
      <Hero />

      {/* COUNTDOWN */}
      <Countdown />

      {/* DIGNITARY */}
      <DignitarySection />

      {/* CONTACT */}
      <Contact />

    </main>
  );
};

export default Home;