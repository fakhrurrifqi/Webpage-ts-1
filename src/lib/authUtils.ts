import { auth } from "./firebase";
import toast from "react-hot-toast";

export const handleSignOut = async (navigate: (path: string) => void) => {
  try {
    await auth.signOut();
    toast.success("Successfully signed out");
    setTimeout(() => navigate("/"), 500);
  } catch (error) {
    toast.error("Error signing out");
    console.error("Sign out Error: ", error);
  }
};
