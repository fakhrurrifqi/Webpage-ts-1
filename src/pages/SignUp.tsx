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
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../lib/firebase";
// import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: SignUpSchema) => {
    setLoading(true);
    try {
      const { name, email, password } = data;
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const defaultPicRef = ref(
        storage,
        "default-avatar-icon-of-social-media-user-vector.jpg",
      );
      const defaultPhotoUrl = await getDownloadURL(defaultPicRef);

      await updateProfile(user, {
        displayName: name,
        photoURL: defaultPhotoUrl,
      });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        photoUrl: defaultPhotoUrl,
        createdAt: new Date(),
      });
      toast.success("Account created successfully!");
      setTimeout(() => navigate("/dashboard"), 500);
    } catch (error) {
      if (typeof error === "object" && error !== null && "code" in error) {
        if (error.code === "auth/email-already-in-use") {
          toast.error("This email is already registered. Try logging in.");
        } else {
          toast.error("Error creating account. Please try again.");
          console.error("Sign up error: ", error);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-primary dark:bg-primary shadow-primary/40 hover:ring-ring dark:shadow-primary/40 dark:hover:ring-ring fixed top-3 right-3 z-20 flex size-9 items-center justify-center rounded-full p-2 shadow-lg hover:ring-2 lg:top-4 lg:right-4 lg:size-10">
        <ThemeToggle className="text-primary-foreground dark:text-primary-foreground cursor-pointer" />
      </div>
      <div className="bg-background flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md rounded-lg p-5 shadow-md">
          <CardHeader className="text-card-foreground text-center text-2xl font-bold">
            Sign Up
          </CardHeader>
          <CardContent>
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
                  label="Password"
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
                disabled={loading}
                className={`text-primary-foreground w-full cursor-pointer rounded-md p-3 font-semibold transition ${
                  loading
                    ? "bg-muted cursor-not-allowed"
                    : "bg-primary hover:bg-primary/90"
                }`}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </form>
            <p className="text-card-foreground mt-4">
              Already have an account?{" "}
              <Link to="/signin" className="underline">
                Sign In
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

export default SignUp;
