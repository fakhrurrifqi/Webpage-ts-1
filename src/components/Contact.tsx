const Contact = () => {
  return (
    <section
      id="contact"
      className="bg-white dark:bg-slate-700  px-6 py-20 h-screen flex flex-col justify-center items-center"
    >
      <div className="max-w-xl mx-auto text-center">
        <h3 className="text-3xl font-bold text-indigo-600 dark:text-indigo-300 mb-4">Contact Us</h3>
        <p className="text-gray-800 dark:text-gray-100 font-semibold mb-8">
          Feel free to reach out for any inquiries or just to say hi!
        </p>
        <form action="" className=" space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border text-white border-gray-300 dark:border-slate-400 p-3 focus:outline-2 focus:outline-indigo-400 rounded-md placeholder:text-slate-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border text-white border-gray-300 dark:border-slate-400 p-3 rounded-md focus:outline-2 focus:outline-indigo-400 placeholder:text-slate-400"
          />
          <textarea
            name="message"
            id="message"
            placeholder="Your Message"
            rows={4}
            className="w-full border text-white border-gray-300 dark:border-slate-400 p-3 rounded-md focus:outline-2 focus:outline-indigo-400 placeholder:text-slate-400 "
          ></textarea>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600  border-white focus:outline-indigo-400 focus:outline-offset-3 text-white w-full p-3 font-semibold rounded-md"
          >
            Send Message
          </button>
          
        </form>
      </div>
    </section>
  );
};

export default Contact;
