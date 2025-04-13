import { useEffect, useState } from "react";

const useDarkMode = (): [boolean, () => void] => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    // Check localStorage or system preference
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return [isDark, toggleTheme];
};

export default useDarkMode;
