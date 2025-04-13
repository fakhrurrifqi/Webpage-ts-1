const Features = () => {
  return (
    <section
      id="choose"
      className="flex h-screen flex-col items-center justify-center bg-gray-100 px-6 py-12 dark:bg-slate-800"
    >
      <h2 className="mb-10 text-center text-3xl font-bold text-indigo-700 dark:text-indigo-300">
        Why Choose Us?
      </h2>
      <div className="mt-7 grid gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 text-center shadow-md dark:bg-slate-700">
          <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-300">
            Fast Performance
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-100">
            Optimized for speed and efficiency
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 text-center shadow-md dark:bg-slate-700">
          <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-300">
            Secure & Reliable
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-100">
            We prioritize your security.
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 text-center shadow-md dark:bg-slate-700">
          <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-300">
            Easy to Use
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-100">
            Simple, user-friendly design.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
