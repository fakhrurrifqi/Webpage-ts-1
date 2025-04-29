import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactForm } from "../schemas/contactSchema";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../lib/firebase";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

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
      className="bg-background dark:bg-background flex h-screen flex-col items-center justify-center px-6 py-20"
    >
      <div className="mx-auto max-w-xl text-center">
        <h3 className="text-card-foreground dark:text-card-foreground mb-4 text-3xl font-bold">
          Contact Us
        </h3>
        <p className="text-muted-foreground dark:text-muted-foreground mb-8 font-semibold">
          Feel free to reach out for any inquiries or just to say hi!
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Your Name"
              {...register("name")}
              className="border-input placeholder:text-muted-foreground text-foreground focus-visible:ring-ring w-full rounded-md border text-base shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
            {errors.name && (
              <p className="mt-1 text-left text-red-500 dark:text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <Input
              type="email"
              placeholder="Your Email"
              {...register("email")}
              className="border-input placeholder:text-muted-foreground text-foreground focus-visible:ring-ring w-full rounded-md border p-3 text-base shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
            {errors.email && (
              <p className="mt-1 text-left text-red-500 dark:text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Textarea
              id="message"
              placeholder="Your Message"
              {...register("message")}
              className="border-input placeholder:text-muted-foreground text-foreground focus-visible:ring-ring w-full rounded-md border text-base shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
            {errors.message && (
              <p className="mt-1 text-left text-red-500 dark:text-red-400">
                {errors.message.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-primary-foreground hover:bg-primary/90 mt-2 w-full cursor-pointer rounded-md border-white font-semibold shadow focus:outline-offset-3 focus:outline-indigo-400"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
