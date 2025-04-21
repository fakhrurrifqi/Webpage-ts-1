import { Link, useNavigate } from "react-router";
import ThemeToggle from "../components/ThemeToggle";
import PasswordInput from "../components/PasswordInput";
import EmailInput from "../components/EmailInput";
import { signInSchema, SignInSchema } from "../schemas/signInSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import toast from "react-hot-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useState } from "react";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: SignInSchema) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success("Signed In");
      setTimeout(() => navigate("/dashboard"), 500);
    } catch (error) {
      toast.error("Failed to sign in");
      console.error("Sign in error: ", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="bg-primary dark:bg-primary shadow-primary/40 hover:ring-ring dark:shadow-primary/40 dark:hover:ring-ring fixed top-3 right-3 z-20 flex size-9 items-center justify-center rounded-full p-2 shadow-lg hover:ring-2 lg:top-4 lg:right-4 lg:size-10">
        <ThemeToggle className="text-primary-foreground dark:text-primary-foreground cursor-pointer" />
      </div>
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-md rounded-lg p-5 shadow-md">
          <CardHeader>
            <CardTitle className="text-card-foreground text-center text-2xl font-bold">
              Sign In
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <EmailInput<SignInSchema>
                  id="signInEmail"
                  label="Email"
                  name="email"
                  register={register}
                  error={errors.email?.message}
                />
              </div>
              <div className="mb-4">
                <PasswordInput<SignInSchema>
                  id="signInPassword"
                  label="Password"
                  name="password"
                  register={register}
                  error={errors.password?.message}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`text-primary-foreground w-full cursor-pointer rounded-md p-3 font-semibold transition ${
                  loading
                    ? "bg-muted cursor-not-allowed"
                    : "bg-primary hover:bg-primary/90"
                }`}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
            <p className="text-card-foreground mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="underline">
                Sign Up
              </Link>
            </p>
          </CardContent>
          {/* Home Link */}
          <CardFooter className="flex justify-center text-center">
            <a href="/" className="text-card-foreground underline">
              ← Back to Home
            </a>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
