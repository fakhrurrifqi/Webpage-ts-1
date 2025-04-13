import useDarkMode from "../hooks/useDarkMode";

const ThemeToggle = () => {
  const [isDark, toggleTheme] = useDarkMode();

  return (
    <button className="text-sm font-medium" onClick={toggleTheme}>
      {" "}
      <span className="material-symbols-outlined text-gray-800 dark:text-gray-100">
        {isDark ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
};

export default ThemeToggle;
