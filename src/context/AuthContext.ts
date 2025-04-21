import { createContext } from "react";

export interface AppUser {
  uid: string;
  email: string;
  name?: string;
  photoUrl?: string;
}

export interface AuthContextType {
  currentUser: AppUser | null;
  // logout: () => Promise<void>;
  // refreshUser: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);
