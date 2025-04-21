import useDarkMode from "../hooks/useDarkMode";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const [isDark, toggleTheme] = useDarkMode();

  return (
    <button className="text-sm font-medium" onClick={toggleTheme}>
      {" "}
      <span
        className={cn(
          "material-symbols-outlined text-xl transition-colors",
          className,
        )}
      >
        {isDark ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
};

export default ThemeToggle;
