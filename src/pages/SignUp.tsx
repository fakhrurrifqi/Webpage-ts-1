import { Link, useNavigate } from "react-router";
import ThemeToggle from "../components/ThemeToggle";
import { SignUpSchema, signUpSchema } from "../schemas/signUpSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "../components/PasswordInput";
import EmailInput from "../components/EmailInput";
import NameInput from "../components/NameInput";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../lib/firebase";
import toast from "react-hot-toast";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: SignUpSchema) => {
    const { name, email, password } = data;
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        createdAt: new Date(),
      });
      toast.success("Account created successfully!");
      setTimeout(() => navigate("/dashboard"), 500);
    } catch (error) {
      toast.error("Error creating account. Please try again.");
      console.error("Sign up error: ", error);
    }
  };

  return (
    <div>
      <div className="fixed top-3 right-3 z-20 flex size-9 items-center justify-center rounded-full bg-indigo-600/60 p-2 shadow-lg shadow-indigo-600/40 hover:ring-2 hover:ring-indigo-600 lg:top-4 lg:right-4 lg:size-10 dark:bg-indigo-300/50 dark:shadow-indigo-200/20 dark:hover:ring-indigo-200">
        <ThemeToggle />
      </div>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-slate-900">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md dark:bg-slate-800">
          <h2 className="mb-6 text-center text-2xl font-bold text-indigo-600 dark:text-indigo-300">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <NameInput<SignUpSchema>
                id="signUpName"
                label="Name"
                name="name"
                register={register}
                error={errors.name?.message}
              />
            </div>
            <div className="mb-4">
              <EmailInput<SignUpSchema>
                id="signUpEmail"
                label="Email"
                name="email"
                register={register}
                error={errors.email?.message}
              />
            </div>
            <div className="mb-4">
              <PasswordInput<SignUpSchema>
                id="signUpPassword"
                label="password"
                name="password"
                register={register}
                error={errors.password?.message}
              />
            </div>
            <div className="mb-4">
              <PasswordInput<SignUpSchema>
                id="signUpConfirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                register={register}
                error={errors.confirmPassword?.message}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md border-white bg-indigo-500 p-3 font-semibold text-white hover:bg-indigo-600 focus:outline-offset-3 focus:outline-indigo-400"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link to="/signin" className="text-indigo-500 hover:underline">
              Sign In
            </Link>
          </p>
          {/* Home Link */}
          <div className="mt-4 text-center">
            <a
              href="/"
              className="text-indigo-600 hover:underline dark:text-indigo-300"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
