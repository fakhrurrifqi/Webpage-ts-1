import Navbar from "@/components/Navbar";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { getPasswordChangeErrorMessage } from "@/utils/firebaseHelper";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PasswordInput from "@/components/PasswordInput";
import {
  DeleteAccountPassSchema,
  deleteAccountPassSchema,
} from "@/schemas/deleteAccountPassSchema";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

async function performAccountDeletion(password: string) {
  const user = auth.currentUser;
  if (!user || !user.email) {
    throw new Error("User not authenticated or email missing.");
  }

  console.log("Creating credential for re-authentication...");
  const credential = EmailAuthProvider.credential(user.email, password);

  console.log("Attempting re-authentication...");
  await reauthenticateWithCredential(user, credential);

  console.log("Re-authentication successful. Deleting user...");
  await deleteUser(user);
  console.log("User deleted successfully.");
}

const DeleteAccountPage = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DeleteAccountPassSchema>({
    resolver: zodResolver(deleteAccountPassSchema),
  });

  const handleConfirmDelete = async (data: DeleteAccountPassSchema) => {
    setIsDeleting(true);
    try {
      await performAccountDeletion(data.currentPassword);
      toast.success("Success", {
        description: "Your account has been permanently deleted.",
      });
      navigate("/");
    } catch (error) {
      console.error("Delete account error:", error);
      toast.error("Deletion Failed", {
        description: getPasswordChangeErrorMessage(error),
      });
    } finally {
      setIsDeleting(false);
      reset({ currentPassword: "" });
    }
  };
  return (
    <>
      <Navbar />
      <main className="bg-background mt-16 flex min-h-[calc(100vh-64px)] w-full items-center justify-center p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center text-2xl font-semibold">
              <AlertTriangle className="mr-2 h-6 w-6" />
              Permanent Account Deletion
            </CardTitle>
            <CardDescription>
              Review the consequences before proceeding.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              This action is irreversible and will permanently remove all your
              data, including profile information, posts, comments, and any
              associated content from our platform. You will not be able to
              recover your account or its data.
            </p>
            <p className="text-destructive text-sm font-medium">
              Please be absolutely sure before continuing.
            </p>

            {/* Dialog Trigger Button - Opens the modal */}
            <Dialog onOpenChange={(open) => !open && reset()}>
              <DialogTrigger asChild>
                <Button variant="destructive" size="lg">
                  Delete My Account
                </Button>
              </DialogTrigger>

              {/* Dialog Content - The Modal */}
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center text-xl font-semibold">
                    <AlertTriangle className="text-destructive mr-2 h-5 w-5" />
                    Confirm Permanent Deletion
                  </DialogTitle>
                  <DialogDescription>
                    To confirm, please enter your current password. This action
                    cannot be undone.
                  </DialogDescription>
                </DialogHeader>

                {/* Form inside the modal */}
                <form
                  onSubmit={handleSubmit(handleConfirmDelete)}
                  className="space-y-4 py-2"
                >
                  <div className="space-y-2">
                    <PasswordInput<DeleteAccountPassSchema>
                      id="DeleteAccountPassword"
                      label="Enter Current Password to Confirm"
                      name="currentPassword"
                      register={register}
                      error={errors.currentPassword?.message}
                    />
                  </div>

                  <DialogFooter className="gap-2 sm:justify-end">
                    {/* DialogClose automatically closes the dialog */}
                    <DialogClose asChild>
                      <Button type="button" variant="outline">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      variant="destructive"
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : null}
                      Confirm & Delete Account
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>

          {/* Optional: Footer with a link back */}
          <CardFooter>
            <Button variant="link" asChild>
              <Link to="/profile">Back to Profile</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    </>
  );
};

export default DeleteAccountPage;
