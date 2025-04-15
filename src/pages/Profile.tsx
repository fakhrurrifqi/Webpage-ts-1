import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import NameInput from "../components/NameInput";
import EmailInput from "../components/EmailInput";
import {
  editProfileSchema,
  EditProfileSchema,
} from "../schemas/editProfileSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

const Profile = () => {
  const { currentUser, refreshUser } = useAuth();
  const [name, setName] = useState(currentUser?.name ?? "");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async () => {
    if (!currentUser) return;
    try {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, { name });
      await refreshUser();
      toast.success("Profile updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating profile: ", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div>
      <Navbar />
      <form
        className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6 dark:bg-slate-700"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-300">
          Your Profile
        </h1>
        {currentUser ? (
          <div className="mt-5 flex w-full max-w-md flex-col">
            <div className="mb-4">
              <EmailInput<EditProfileSchema>
                id="profileName"
                value={currentUser.email}
                readonly
                label="Email"
              />
            </div>
            <div className="mb-4">
              <NameInput<EditProfileSchema>
                id="profilName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                register={register}
                label="Name"
                name="name"
                error={errors.name?.message}
              />
            </div>
            <button
              className="w-full rounded-md border-white bg-indigo-500 p-3 font-semibold text-white hover:bg-indigo-600 focus:outline-offset-3 focus:outline-indigo-400"
              type="submit"
            >
              Update Profile
            </button>
          </div>
        ) : (
          <p className="text-gray-700 dark:text-gray-200">
            Loading user data...
          </p>
        )}
      </form>
    </div>
  );
};

export default Profile;
