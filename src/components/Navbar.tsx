import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import ThemeToggle from "./ThemeToggle";
import AuthButtons from "./AuthButtons";
import { handleSignOut } from "../lib/authUtils";
import { useLocation } from "react-router";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = (
    <>
      <li>
        <a
          href="/#hero"
          className="hover:text-indigo-400 dark:hover:text-indigo-300"
        >
          Home
        </a>
      </li>
      <li>
        <a
          href="/#choose"
          className="hover:text-indigo-400 dark:hover:text-indigo-300"
        >
          Features
        </a>
      </li>
      <li>
        <a
          href="/#contact"
          className="hover:text-indigo-400 dark:hover:text-indigo-300"
        >
          Contact
        </a>
      </li>
    </>
  );

  return (
    <nav className="fixed top-0 z-20 flex w-full items-center justify-between bg-white px-6 py-4 shadow-md dark:bg-slate-900">
      <div className="flex items-center space-x-6">
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-gray-100">
          Brand
        </h1>
        <ul className="hidden items-center space-x-6 text-gray-800 md:flex dark:text-gray-100">
          {navLinks}
        </ul>
      </div>

      <div className="flex items-center space-x-6">
        {/* Desktop Nav */}
        <ThemeToggle />

        <ul className="hidden items-center space-x-6 text-gray-800 md:flex dark:text-gray-100">
          {user ? (
            <>
              {location.pathname !== "/dashboard" && (
                <AuthButtons to="/dashboard">Dashboard</AuthButtons>
              )}

              {location.pathname !== "/profile" && (
                <AuthButtons to="/profile">Profile</AuthButtons>
              )}

              <AuthButtons
                onClick={() => handleSignOut(navigate)}
                variant="button"
              >
                Sign Out
              </AuthButtons>
            </>
          ) : (
            <>
              <AuthButtons to="/signin">Login</AuthButtons>
              <AuthButtons to="/signup" variant="button">
                Sign Up
              </AuthButtons>
            </>
          )}
        </ul>
      </div>

      {/* Mobile Burger */}
      <div className="flex items-center space-x-4 md:hidden">
        <button
          onClick={() => setMenuOpen(true)}
          className="text-3xl text-indigo-400 hover:text-indigo-500 focus:outline-none dark:text-gray-100 dark:hover:text-indigo-300"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu Slide Out */}
      <div
        className={`fixed top-0 right-0 z-30 h-full w-2/3 transform bg-white p-6 shadow-lg transition-transform duration-300 ease-in-out md:hidden dark:bg-slate-900 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-4 right-4 text-2xl text-indigo-400 hover:text-indigo-500 dark:text-gray-100 dark:hover:text-indigo-300"
        >
          ✕
        </button>
        <ul className="mt-12 space-y-4 text-lg text-gray-800 dark:text-gray-100">
          {navLinks}
          {user ? (
            <>
              <li>
                {location.pathname !== "/dashboard" && (
                  <AuthButtons to="/dashboard" isMobile>
                    Dashboard
                  </AuthButtons>
                )}
              </li>
              {location.pathname !== "/profile" && (
                <li>
                  <AuthButtons to="/profile" isMobile>
                    Profile
                  </AuthButtons>
                </li>
              )}
              <li>
                <AuthButtons
                  onClick={() => handleSignOut(navigate)}
                  isMobile={true}
                >
                  Sign Out
                </AuthButtons>
              </li>
            </>
          ) : (
            <>
              <li>
                <AuthButtons to="/signin" isMobile={true}>
                  Sign In
                </AuthButtons>
              </li>
              <li>
                <AuthButtons to="/signup" isMobile={true}>
                  Sign Up
                </AuthButtons>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
