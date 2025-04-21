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
    ? "block hover:text-muted-foreground dark:hover:text-muted-foreground"
    : "px-4 py-1.5 hover:text-muted-foreground dark:hover:text-muted-foreground";

  const buttonClasses =
    "px-4 py-1.5 font-bold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 dark:primary dark:text-primary-foreground dark:hover:bg-primary/90 cursor-pointer";

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
