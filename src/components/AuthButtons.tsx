import { Link } from "react-router";
import { ReactNode } from "react";

type AuthButtonsProps = {
  children: ReactNode;
  onClick?: () => void;
  to?: string;
  className?: string;
  variant?: "link" | "button";
  isMobile?: boolean;
};

const AuthButtons = ({
  children,
  onClick,
  to,
  className = "",
  variant = "link",
  isMobile = false,
}: AuthButtonsProps) => {
  const linkClasses = isMobile
    ? "block hover:text-indigo-400 dark:hover:text-indigo-300"
    : "px-4 py-1.5 hover:text-indigo-800 dark:hover:text-indigo-300";

  const buttonClasses =
    "px-4 py-1.5 font-bold rounded-md bg-indigo-600 text-white hover:bg-indigo-500 hover:text-white dark:bg-indigo-400 dark:text-gray-900 dark:hover:bg-indigo-500 dark:hover:text-white";

  const baseClasses = variant === "button" ? buttonClasses : linkClasses;

  const combinedClasses = `${baseClasses} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {children}
      </Link>
    );
  } else if (onClick) {
    return (
      <button onClick={onClick} className={combinedClasses}>
        {children}
      </button>
    );
  }
  // Fallback: just render a span if neither to nor onClick is provided
  return <span className={combinedClasses}>{children}</span>;
};

export default AuthButtons;
