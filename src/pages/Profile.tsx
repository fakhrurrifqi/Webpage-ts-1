import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../lib/firebase";
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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import DefaultProfilePic from "../assets/default-profile.jpg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserProfile } from "@/lib/fetchUserProfile";

const Profile = () => {
  const { currentUser } = useAuth();
  const [name, setName] = useState(currentUser?.name ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: userProfile,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => fetchUserProfile(currentUser!.uid),
    enabled: !!currentUser,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: userProfile?.name ?? "",
    },
  });

  // Sync name and previewUrl with currentUser when it changes
  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name ?? "");
      setPreviewUrl(userProfile.photoUrl ?? null);
      setImageFile(null);
    }
  }, [userProfile]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Add a check for unchanged name (trimmed)
  const isNameUnchanged =
    userProfile && name.trim() === (userProfile.name ?? "").trim();

  const isProfileUnchanged = isNameUnchanged && !imageFile;

  const onSubmit = async () => {
    if (!currentUser || !userProfile) return;

    const updateData: { name?: string; photoUrl?: string } = {};
    if (imageFile) {
      const fileRef = ref(storage, `profilePictures/${currentUser.uid}`);
      await uploadBytes(fileRef, imageFile);
      const photoURL = await getDownloadURL(fileRef);
      updateData.photoUrl = photoURL;
    }

    if (!isNameUnchanged) {
      updateData.name = name.trim();
    }

    if (Object.keys(updateData).length === 0) {
      toast("No changes made to profile");
      return;
    }

    try {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, updateData);
      await refetch();
      await queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      toast.success("Profile updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating profile: ", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-background mt-16 flex min-h-[calc(100vh-64px)] items-center justify-center p-5">
        <Card className="w-full max-w-md rounded-lg p-6 shadow-md">
          <CardHeader>
            <CardTitle className="text-card-foreground text-center text-4xl font-bold">
              Your Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              {isLoading ? (
                <p className="text-shadow-muted-foreground text-center">
                  {" "}
                  Loading User data
                </p>
              ) : userProfile ? (
                <div className="flex w-full max-w-md flex-col">
                  {(previewUrl || userProfile?.photoUrl) && (
                    <div className="mb-4 flex justify-center">
                      <img
                        src={
                          previewUrl ||
                          userProfile.photoUrl ||
                          DefaultProfilePic
                        }
                        alt="Profile Preview"
                        className="ring-ring mx-auto size-24 rounded-full object-cover ring-2"
                      />
                    </div>
                  )}

                  <div className="mb-4 flex flex-col items-center">
                    <label
                      htmlFor="fileUpload"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer rounded px-3 py-1.5 font-medium transition"
                    >
                      Choose Profile Picture
                    </label>
                    <input
                      id="fileUpload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                  <div className="mb-4">
                    <EmailInput<EditProfileSchema>
                      id="profileEmail"
                      value={currentUser?.email}
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
                    className={`w-full rounded-md border-white p-3 font-semibold transition ${
                      isProfileUnchanged
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                    type="submit"
                    disabled={!!isProfileUnchanged}
                  >
                    Update Profile
                  </button>
                </div>
              ) : (
                <p className="text-muted-foreground text-center">
                  Failed to load user data
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
