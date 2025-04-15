import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const section = document.querySelector(hash);
      section?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return (
    <div className="font-grotesk">
      <Navbar />
      <Hero />
      <Features />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
