import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

type UserProfile = {
  name: string;
  email: string;
  photoUrl: string;
};

export const fetchUserProfile = async (uid: string): Promise<UserProfile> => {
  const user = auth.currentUser;
  if (!user) throw new Error("No authenticated user");

  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("user profile not found");
  }

  return docSnap.data() as UserProfile;
};
