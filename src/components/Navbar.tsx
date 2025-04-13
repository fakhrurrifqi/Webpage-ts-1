import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { Link } from "react-router";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = (
    <>
      <li>
        <a
          href="#hero"
          className="hover:text-indigo-400 dark:hover:text-indigo-300"
        >
          Home
        </a>
      </li>
      <li>
        <a
          href="#choose"
          className="hover:text-indigo-400 dark:hover:text-indigo-300"
        >
          Features
        </a>
      </li>
      <li>
        <a
          href="#contact"
          className="hover:text-indigo-400 dark:hover:text-indigo-300"
        >
          Contact
        </a>
      </li>
    </>
  );
  return (
    <nav className="fixed top-0 z-20 flex w-full items-center justify-between bg-white dark:bg-slate-900 px-6 py-4 shadow-md">
      <h1 className="text-2xl font-bold text-indigo-600 dark:text-gray-100 ">
        Brand
      </h1>

      <div className="flex items-center space-x-6">
        {/* Desktop Nav */}
        <ThemeToggle />

        <ul className="hidden space-x-6 text-gray-800 dark:text-gray-100 md:flex items-center">
          {navLinks}
          <li>
            <Link
              to="/signin"
              className="px-4 py-1.5 rounded font-bold text-indigo-600 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-white"
            >
              Log In
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="px-4 py-1.5 rounded font-bold bg-indigo-600 text-white hover:bg-indigo-500 dark:bg-indigo-400 dark:text-gray-900 dark:hover:bg-indigo-300"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Burger */}
      <div className="flex items-center space-x-4 md:hidden">
        <button
          onClick={() => setMenuOpen(true)}
          className="text-3xl text-indigo-400 hover:text-indigo-500 dark:text-gray-100 dark:hover:text-indigo-300 focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu Slide Out */}
      <div
        className={`fixed top-0 right-0 z-30 h-full w-2/3 transform bg-white dark:bg-slate-900 p-6 shadow-lg transition-transform duration-300 ease-in-out md:hidden ${
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
          <li>
            <Link
              to="/signin"
              className="block hover:text-indigo-400 dark:hover:text-indigo-300"
            >
              Sign In
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="block hover:text-indigo-400 dark:hover:text-indigo-300"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
