const Contact = () => {
  return (
    <section
      id="contact"
      className="flex h-screen flex-col items-center justify-center bg-white px-6 py-20 dark:bg-slate-700"
    >
      <div className="mx-auto max-w-xl text-center">
        <h3 className="mb-4 text-3xl font-bold text-indigo-600 dark:text-indigo-300">
          Contact Us
        </h3>
        <p className="mb-8 font-semibold text-gray-800 dark:text-gray-100">
          Feel free to reach out for any inquiries or just to say hi!
        </p>
        <form action="" className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full rounded-md border border-gray-300 p-3 text-white placeholder:text-slate-400 focus:outline-2 focus:outline-indigo-400 dark:border-slate-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full rounded-md border border-gray-300 p-3 text-white placeholder:text-slate-400 focus:outline-2 focus:outline-indigo-400 dark:border-slate-400"
          />
          <textarea
            name="message"
            id="message"
            placeholder="Your Message"
            rows={4}
            className="w-full rounded-md border border-gray-300 p-3 text-white placeholder:text-slate-400 focus:outline-2 focus:outline-indigo-400 dark:border-slate-400"
          ></textarea>
          <button
            type="submit"
            className="w-full rounded-md border-white bg-indigo-500 p-3 font-semibold text-white hover:bg-indigo-600 focus:outline-offset-3 focus:outline-indigo-400"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
