import { Routes, Route } from "react-router";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import ChangePassword from "@/pages/ChangePassword";
import DeleteAccountPage from "@/pages/DeleteAccountPage";
import { PrivateRoute } from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings/change-password"
        element={
          <PrivateRoute>
            <ChangePassword />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings/delete-account"
        element={
          <PrivateRoute>
            <DeleteAccountPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
