import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactForm } from "../schemas/contactSchema";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../lib/firebase";
import toast from "react-hot-toast";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactForm) => {
    try {
      await addDoc(collection(db, "contacts"), {
        ...data,
        createdAt: new Date(),
      });
      toast.success("Message sent successfully!");
      reset();
    } catch (error) {
      console.error("Error sending message: ", error);
      toast.error("Failed to send message. Please try again later.");
    }
  };
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Your Name"
              {...register("name")}
              className="w-full rounded-md border border-gray-300 p-3 text-white placeholder:text-slate-400 focus:outline-2 focus:outline-indigo-400 dark:border-slate-400"
            />
            {errors.name && (
              <p className="mt-1 text-left text-red-500 dark:text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="email"
              placeholder="Your Email"
              {...register("email")}
              className="w-full rounded-md border border-gray-300 p-3 text-white placeholder:text-slate-400 focus:outline-2 focus:outline-indigo-400 dark:border-slate-400"
            />
            {errors.email && (
              <p className="mt-1 text-left text-red-500 dark:text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <textarea
              id="message"
              placeholder="Your Message"
              rows={4}
              {...register("message")}
              className="w-full rounded-md border border-gray-300 p-3 text-white placeholder:text-slate-400 focus:outline-2 focus:outline-indigo-400 dark:border-slate-400"
            />
            {errors.message && (
              <p className="mt-1 text-left text-red-500 dark:text-red-400">
                {errors.message.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md border-white bg-indigo-500 p-3 font-semibold text-white hover:bg-indigo-600 focus:outline-offset-3 focus:outline-indigo-400"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
