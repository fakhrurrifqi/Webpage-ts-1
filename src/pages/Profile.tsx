import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../lib/firebase";
import { toast } from "sonner";
import Navbar from "../components/Navbar";
import NameInput from "../components/NameInput";
import EmailInput from "../components/EmailInput";
import {
  editProfileSchema,
  EditProfileSchema,
} from "../schemas/editProfileSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import DefaultProfilePic from "../assets/default-profile.jpg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserProfile } from "@/lib/fetchUserProfile";
import { Link } from "react-router";

const Profile = () => {
  const { currentUser } = useAuth();
  const [name, setName] = useState(currentUser?.name ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // const navigate = useNavigate();
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
  });

  const [bio, setBio] = useState(userProfile?.bio ?? "");

  // Sync name and previewUrl with currentUser when it changes
  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name ?? "");
      setPreviewUrl(userProfile.photoUrl ?? null);
      setBio(userProfile.bio || "");
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

  const onSubmit = async () => {
    if (!currentUser || !userProfile) return;

    try {
      const updateData: { name?: string; photoUrl?: string; bio?: string } = {
        name: name.trim(),
        bio: bio.trim(),
      };
      if (imageFile) {
        const fileRef = ref(storage, `profilePictures/${currentUser.uid}`);
        await uploadBytes(fileRef, imageFile);
        const photoURL = await getDownloadURL(fileRef);
        updateData.photoUrl = photoURL;
      }

      await updateDoc(doc(db, "users", currentUser.uid), updateData);
      await refetch();
      await queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile: ", error);
      toast.error("Failed to update profile.");
    }
  };

  if (isLoading) {
    return (
      <p className="text-muted-foreground mt-10 text-center">
        Loading profile...
      </p>
    );
  }

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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex justify-center">
                <img
                  src={previewUrl || DefaultProfilePic}
                  alt="Avatar"
                  className="ring-ring mx-auto size-24 rounded-full object-cover ring-2"
                />
              </div>
              {isEditing && (
                <div className="flex flex-col items-center">
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
              )}

              {isEditing ? (
                <div className="mb-4">
                  <EmailInput<EditProfileSchema>
                    id="profileEmail"
                    value={currentUser?.email}
                    readonly
                    label="Email"
                  />
                  <Link to="/" className="mt-4 underline">
                    Change Email
                  </Link>
                </div>
              ) : (
                <div>
                  <label htmlFor="">Email</label>
                  <p className="text-muted-foreground">{currentUser?.email}</p>
                </div>
              )}

              {isEditing ? (
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
              ) : (
                <div>
                  <label className="text-card-foreground">Name</label>
                  <p className="text-muted-foreground">{userProfile?.name}</p>
                </div>
              )}

              <div className="mb-4">
                <label className="text-card-foreground blockfont-medium mb-1">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    className="border-input focus:ring-ring mt-1 w-full rounded-md border p-3 text-base shadow-sm focus:ring-2 focus:outline-none"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                  />
                ) : (
                  <div>
                    <p className="text-muted-foreground">
                      {userProfile?.bio || "No bio added yet"}
                    </p>
                  </div>
                )}
              </div>
              {isEditing && (
                <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-between">
                  <Link
                    to="/settings/change-password"
                    className="text-card-foreground underline"
                  >
                    Change Password
                  </Link>
                  <Link
                    to="/settings/delete-account"
                    className="text-destructive underline"
                  >
                    Delete Account
                  </Link>
                </div>
              )}
              {isEditing ? (
                <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-between">
                  <button
                    type="button"
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-muted hover:bg-muted/80 text-foreground cursor-pointer rounded px-4 py-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={onSubmit}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer rounded px-4 py-2"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 w-full cursor-pointer rounded px-4 py-2"
                >
                  Edit Profile
                </button>
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
