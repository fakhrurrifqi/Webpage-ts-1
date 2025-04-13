const Features = () => {
  return (
    <section
      id="choose"
      className="bg-gray-100 dark:bg-slate-800 px-6 py-12 h-screen flex flex-col justify-center items-center"
    >
      <h2 className="text-center text-3xl font-bold text-indigo-700 dark:text-indigo-300 mb-10">
        Why Choose Us?
      </h2>
      <div className="mt-7 grid gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-white dark:bg-slate-700 p-6 text-center shadow-md">
          <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-300">Fast Performance</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-100">
            Optimized for speed and efficiency
          </p>
        </div>
        <div className="rounded-lg bg-white dark:bg-slate-700 p-6 text-center shadow-md">
          <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-300">Secure & Reliable</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-100">We prioritize your security.</p>
        </div>
        <div className="rounded-lg bg-white dark:bg-slate-700 p-6 text-center shadow-md">
          <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-300">Easy to Use</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-100">Simple, user-friendly design.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
