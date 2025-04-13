const Hero = () => {
  return (
    <section
      id="hero"
      className="relative flex h-screen items-center justify-center bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')] bg-cover bg-center px-6 text-white lg:flex-row"
    >
      <div className="absolute inset-0 bg-slate-900/60"></div>
      <div className="relative z-10 max-w-2xl text-center">
        <h2 className="text-4xl font-bold drop-shadow-lg">
          Welcome To Our Website
        </h2>
        <p className="mt-2 text-lg">We Build Amazing Website</p>
        <a href="#choose" className="animated-btn mt-6">
          Get Started
        </a>
      </div>
    </section>
  );
};

export default Hero;
