import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../lib/firebase";
import { toast } from "sonner";
import Navbar from "../components/Navbar";
// import NameInput from "../components/NameInput";
// import EmailInput from "../components/EmailInput";
import {
  editProfileSchema,
  EditProfileSchema,
} from "../schemas/editProfileSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import DefaultProfilePic from "../assets/default-profile.jpg";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Footer from "@/components/Footer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserProfile } from "@/lib/fetchUserProfile";
import { Link } from "react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Camera, Mail, Pencil, Loader2 } from "lucide-react";

type ProfileUpdateData = {
  name: string;
  bio?: string;
  photoUrl?: string;
};

const Profile = () => {
  const { currentUser } = useAuth();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: userProfile,
    isLoading: isLoadingProfile,
    isError,
  } = useQuery({
    queryKey: ["userProfile", currentUser?.uid], // Include UID in query key
    queryFn: () => fetchUserProfile(currentUser!.uid),
    enabled: !!currentUser, // Only run query if currentUser exists
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });

  const {
    register,
    handleSubmit,
    reset, // Use reset to populate/update form
    formState: { errors, isDirty }, // isDirty can track if form changed
  } = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: "",
      bio: "",
    },
  });

  // Sync name and previewUrl with currentUser when it changes
  useEffect(() => {
    if (userProfile) {
      reset({
        name: userProfile.name ?? "",
        bio: userProfile.bio ?? "",
      });
      setPreviewUrl(userProfile.photoUrl ?? null);
      setImageFile(null);
    }
  }, [userProfile, reset]);

  // --- Image Handling ---
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // --- Data Mutation (Profile Update) ---
  const mutation = useMutation({
    mutationFn: async (data: EditProfileSchema) => {
      if (!currentUser) throw new Error("User not authenticated.");

      const updateData: ProfileUpdateData = {
        name: data.name.trim(), // Use data from react-hook-form
        bio: data.bio?.trim(),
      };

      // Handle image upload if a new file was selected
      if (imageFile) {
        console.log("Uploading new profile picture...");
        const fileRef = ref(storage, `profilePictures/${currentUser.uid}`);
        await uploadBytes(fileRef, imageFile);
        const photoURL = await getDownloadURL(fileRef);
        updateData.photoUrl = photoURL;
        console.log("Upload complete, URL:", photoURL);
      }

      console.log("Updating Firestore document:", updateData);
      await updateDoc(doc(db, "users", currentUser.uid), updateData);
      return updateData;
    },
    onSuccess: (data) => {
      toast.success("Profile updated successfully!");
      // Invalidate query to refetch fresh data
      queryClient.invalidateQueries({
        queryKey: ["userProfile", currentUser?.uid],
      });
      // Optionally update previewUrl immediately if photo was changed
      if (data.photoUrl) {
        setPreviewUrl(data.photoUrl);
      }
      setImageFile(null);
      setIsEditing(false);
    },
    onError: (error: unknown) => {
      console.error("Error updating profile: ", error);
      const errorMessage =
        error && typeof error === "object" && "message" in error
          ? (error as { message?: string }).message
          : "Unknown error";
      toast.error(`Failed to update profile: ${errorMessage}`);
    },
  });

  // --- Form Submit Handler ---
  const onSubmit = (data: EditProfileSchema) => {
    // Only trigger mutation if form has changes or a new image was selected
    if (isDirty || imageFile) {
      mutation.mutate(data);
    } else {
      setIsEditing(false);
      toast.info("No changes detected.");
    }
  };

  // --- Cancel Edit Handler ---
  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset form to originally loaded profile data
    reset({
      name: userProfile?.name ?? "",
      bio: userProfile?.bio ?? "",
    });
    // Reset image preview to original or default
    setPreviewUrl(userProfile?.photoUrl ?? null);
    setImageFile(null);
  };

  // --- Loading State ---
  if (isLoadingProfile) {
    return (
      <>
        <Navbar />
        <div className="bg-background mt-16 flex min-h-[calc(100vh-64px)] items-center justify-center p-4 sm:p-6 lg:p-8">
          <Card className="w-full max-w-lg p-6">
            <CardHeader className="items-center">
              <Skeleton className="h-8 w-48" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <Skeleton className="size-24 rounded-full" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        </div>
        <Footer />
      </>
    );
  }

  // --- Error State ---
  if (isError) {
    return (
      <>
        <Navbar />
        <div className="bg-background mt-6 flex min-h-[calc(100vh-64px)] items-center justify-center p-4">
          <p className="text-destructive">Failed to load profile data.</p>
        </div>
        <Footer />
      </>
    );
  }

  // --- Render Profile ---
  return (
    <>
      <Navbar />
      <main className="bg-background mt-16 flex min-h-[calc(100vh-64px)] items-center justify-center p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-lg">
          <CardHeader className="items-center text-center">
            <CardTitle className="text-3xl font-bold">User Profile</CardTitle>
            <CardDescription>
              View and manage your profile information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Use handleSubmit from react-hook-form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* --- Profile Picture --- */}
              <div className="relative mx-auto w-fit">
                <img
                  src={previewUrl || DefaultProfilePic}
                  alt="Profile Avatar"
                  className="ring-ring ring-offset-background size-28 rounded-full object-cover ring-2 ring-offset-2"
                />

                {isEditing && (
                  <Label
                    htmlFor="fileUpload"
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/80 absolute right-0 bottom-0 cursor-pointer rounded-full p-2 shadow-md transition-colors"
                    title="Change profile picture"
                  >
                    <Camera className="size-5" />
                    <Input
                      id="fileUpload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </Label>
                )}
              </div>

              {/* --- Email (Read-only) --- */}
              <div className="space-y-2">
                <Label htmlFor="profileEmail">Email</Label>
                <div className="flex items-center space-x-3">
                  <Mail className="text-muted-foreground size-5" />
                  <Input
                    id="profileEmail"
                    type="email"
                    value={currentUser?.email ?? "N/A"}
                    readOnly
                    className="text-muted-foreground border-none p-0 read-only:cursor-default read-only:bg-transparent read-only:px-0 read-only:shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                {/* Optionally link to change email if functionality exists */}
                <Link
                  to="/settings/change-email"
                  className="hover:text-primary text-right text-xs underline"
                >
                  Change Email
                </Link>
              </div>

              {/* --- Name (Editable) --- */}
              <div className="space-y-2">
                <Label htmlFor="profileName">Name</Label>
                <Input
                  id="profileName"
                  readOnly={!isEditing}
                  {...register("name")}
                  className={`read-only:text-foreground read-only:cursor-default read-only:border-transparent read-only:bg-transparent read-only:px-0 read-only:text-base read-only:shadow-none read-only:focus-visible:ring-0 read-only:focus-visible:ring-offset-0 ${errors.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
                />
                {errors.name && (
                  <p className="text-destructive text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* --- Bio (Editable) --- */}
              <div className="space-y-2">
                <Label htmlFor="profileBio">Bio</Label>
                <Textarea
                  id="profileBio"
                  readOnly={!isEditing}
                  rows={3}
                  placeholder={
                    isEditing
                      ? "Tell us about yourself..."
                      : "No bio added yet."
                  }
                  {...register("bio")}
                  className={`read-only:text-foreground read-only:cursor-default read-only:border-transparent read-only:bg-transparent read-only:px-0 read-only:text-base read-only:shadow-none read-only:focus-visible:ring-0 read-only:focus-visible:ring-offset-0 ${errors.bio ? "border-destructive focus-visible:ring-destructive" : ""}`}
                />
                {errors.bio && (
                  <p className="text-destructive text-sm">
                    {errors.bio.message}
                  </p>
                )}
              </div>

              <Separator />

              {/* --- Action Buttons --- */}
              {isEditing ? (
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancelEdit}
                    disabled={mutation.isPending} // Disable while saving
                    className="cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={mutation.isPending || (!isDirty && !imageFile)} // Disable if saving or no changes
                    className={isDirty ? "cursor-pointer" : "cursor-none"}
                  >
                    {mutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Save Changes
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="w-full cursor-pointer"
                >
                  <Pencil className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              )}

              {isEditing && (
                <div className="mt-6 flex flex-col space-y-2 text-sm sm:flex-row sm:justify-between sm:space-y-0">
                  <Button
                    variant="link"
                    className="h-auto justify-start p-0"
                    asChild
                  >
                    <Link to="/settings/change-password" className="underline">
                      Change Password
                    </Link>
                  </Button>
                  <Button
                    variant="link"
                    className="text-destructive h-auto justify-start p-0 sm:justify-end"
                    asChild
                  >
                    <Link to="/settings/delete-account" className="underline">
                      Delete Account
                    </Link>
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
};

export default Profile;
