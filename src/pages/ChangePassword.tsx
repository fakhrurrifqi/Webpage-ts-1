import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import PasswordInput from "@/components/PasswordInput";
import Navbar from "@/components/Navbar";
import {
  ChangePasswordSchema,
  changePasswordSchema,
} from "@/schemas/changePasswordSchema";
import { useState } from "react";
import { toast } from "sonner";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getPasswordChangeErrorMessage } from "@/utils/firebaseHelper";

// Helper function for re-authentication
const reaunthenticateUser = async (
  user: User,
  currentPassword: string,
): Promise<void> => {
  if (!user.email) {
    throw new Error("User email is not available for re-authentication.");
  }
  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, credential);
};


const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordSchema) => {
    const user = auth.currentUser;

    if (!user) {
      console.warn("Change password attempt failed: User not authenticated.");
      toast.error("You must be logged in to change your password.");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Re-authenticate
      console.log("Attempting to re-authenticate user...");
      await reaunthenticateUser(user, data.currentPassword);
      console.log("Re-authentication successful.");

      //Step 2: Update password
      console.log("Attempting to update password...");
      await updatePassword(user, data.newPassword);
      console.log("Password update successful.");

      // --- Success ---
      toast.success("Password updated successfully!");
      reset();
      navigate("/dashboard");
    } catch (error: unknown) {
      console.error("Password change error:", error);
      const errorMessage = getPasswordChangeErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-background mt-16 flex min-h-[calc(100vh-64px)] items-center justify-center p-5">
        <div className="bg-card text-card-foreground w-full max-w-md rounded-lg border p-6 shadow-md">
          <form
            className="flex flex-col space-y-5"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <PasswordInput<ChangePasswordSchema>
              id="currentPassword"
              label="Current Password"
              name="currentPassword"
              register={register}
              error={errors.currentPassword?.message}
            />
            <PasswordInput<ChangePasswordSchema>
              id="newPassword"
              label="New Password"
              name="newPassword"
              register={register}
              error={errors.newPassword?.message}
            />
            <PasswordInput<ChangePasswordSchema>
              id="confirmNewPassword"
              label="Confirm New Password"
              name="confirmNewPassword"
              register={register}
              error={errors.confirmNewPassword?.message}
            />

            {/* Forgot Password Link */}
            <div className="text-right text-sm">
              <Link
                to="/settings/resetpassword"
                className="text-primary hover:text-primary/90 underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`text-primary-foreground focus:ring-primary w-full rounded-md px-4 py-2.5 font-semibold transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none ${
                loading
                  ? "bg-muted hover::bg-muted cursor-not-allowed"
                  : "bg-primary hover:bg-primary/90 cursor-pointer"
              }`}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
          <div className="mt-5">
          <a href="/profile" className="text-card-foreground underline">
              ← Cancel
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
