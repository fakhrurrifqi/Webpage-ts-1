import { Link } from "react-router";
import ThemeToggle from "../components/ThemeToggle";
import { SignUpSchema, signUpSchema } from "../schemas/signUpSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "../components/PasswordInput";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpSchema) => {
    console.log("Sign Up Data:", data);
  };

  return (
    <div>
      <div className="fixed top-3 lg:top-4 right-3 lg:right-4 size-9 lg:size-10 bg-indigo-600/60 dark:bg-indigo-300/50 rounded-full flex items-center justify-center p-2 shadow-lg hover:ring-2 hover:ring-indigo-600 dark:hover:ring-indigo-200 shadow-indigo-600/40 dark:shadow-indigo-200/20 z-20">
        <ThemeToggle />
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900 px-4">
        <div className="w-full max-w-md p-8 bg-white dark:bg-slate-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-indigo-600 dark:text-indigo-300 mb-6">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-md text-gray-600 dark:text-gray-300 mb-1"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                className="w-full rounded-md border border-gray-300 dark:border-slate-400 dark:text-white p-3 focus:outline-2 focus:outline-indigo-400"
              />
              {errors.name && (
                <p className="text-red-500 dark:text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-md text-gray-600 dark:text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="w-full rounded-md border border-gray-300 dark:border-slate-400 dark:text-white p-3 focus:outline-2 focus:outline-indigo-400"
              />
              {errors.email && (
                <p className="text-red-500 dark:text-red-400">
                  {errors.email.message}
                </p>
              )}
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
              className="bg-indigo-500 hover:bg-indigo-600  border-white focus:outline-indigo-400 focus:outline-offset-3 text-white w-full p-3 font-semibold rounded-md"
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
          <div className="text-center mt-4">
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
