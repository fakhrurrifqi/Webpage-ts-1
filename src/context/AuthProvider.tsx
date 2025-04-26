import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { AuthContext } from "./AuthContext";
import { AppUser } from "./AuthContext";
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        const firestoreData = docSnap.exists() ? docSnap.data() : {};
        setCurrentUser({
          uid: user.uid,
          email: user.email || "",
          name: firestoreData.name || user.displayName || "",
          photoUrl: firestoreData.photoUrl || user.photoURL || "",
          bio: firestoreData.bio || "",
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // const logout = async () => {
  //   await signOut(auth);
  // };

  // const refreshUser = async () => {
  //   if (!currentUser?.uid || !auth.currentUser) return;
  //   const docSnap = await getDoc(doc(db, "users", currentUser.uid));
  //   setCurrentUser({
  //     uid: auth.currentUser.uid,
  //     email: auth.currentUser.email || "",
  //     name: auth.currentUser.displayName || "",
  //     photoUrl: auth.currentUser.photoURL || "",
  //     ...docSnap.data(),
  //   });
  // };

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
