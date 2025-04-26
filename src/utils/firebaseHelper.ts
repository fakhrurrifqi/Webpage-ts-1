import { FirebaseError } from "firebase/app";

// Helper function to determine error message
export const getPasswordChangeErrorMessage = (error: unknown): string => {
  console.error("Password change process failed:", error);
  const fallBackMessage = "Failed to change password. Please try again.";

  if (error instanceof FirebaseError) {
    const firebaseError = error as FirebaseError;
    switch (firebaseError.code) {
      case "auth/invalid-credential":
        return "The password you entered is incorrect.";
      case "auth/too-many-requests":
        return "Too many attempts have been made. Please try again later.";
      case "auth/missing-password":
        return "Password cannot be empty.";
      default:
        console.warn(`Unhandled Firebase error code: ${firebaseError.code}`);
        // Optional: Use the Firebase error message if available and seems user-friendly
        return firebaseError.message || fallBackMessage;
        break;
    }
  } else if (error instanceof Error) {
    return `An unexpected error occurred: ${error.message}`;
  }
  return fallBackMessage;
};
