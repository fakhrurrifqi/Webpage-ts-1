import { onAuthStateChanged, signOut } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import { AuthContext } from "./AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { AppUser } from "./AuthContext";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setCurrentUser({
            uid: user.uid,
            email: user.email || "",
            name: userData.name || "", // ← key line!
          });
        } else {
          setCurrentUser({
            uid: user.uid,
            email: user.email || "",
          });
        }
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  const refreshUser = async () => {
    const docSnap = await getDoc(doc(db, "users", currentUser?.uid || ""));
    if (auth.currentUser?.uid) {
      setCurrentUser({
        uid: auth.currentUser.uid,
        email: auth.currentUser.email || "",
        ...docSnap.data(),
      });
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
