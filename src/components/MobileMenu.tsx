import React from "react";
import AuthNavLinks from "./AuthNavLinks";

interface NavLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navLinks,
}) => {
  return (
    <div
      className={`bg-accent fixed top-0 right-0 z-30 h-full w-2/3 transform p-6 shadow-lg transition-transform duration-300 ease-in-out md:hidden ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
    >
      <button
        onClick={onClose}
        className="text-accent-foreground hover:text-muted-foreground absolute top-4 right-4 text-2xl"
        aria-label="Close menu"
      >
        ✕
      </button>
      <nav className="mt-12" aria-label="Mobile navigation">
        <ul className="mt-12 space-y-4 text-lg text-accent-foreground">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="hover:text-muted-foreground dark:hover:text-muted-foreground block"
                onClick={onClose}
              >
                {link.label}
              </a>
            </li>
          ))}
          <hr className="border-muted-foreground/50 my-4" />
          {/* Use the AuthNavLinks component for mobile */}
          <AuthNavLinks
            isMobile={true}
            itemClassName="text-lg" // Pass styling if needed
          />
        </ul>
      </nav>
    </div>
  );
};

export default MobileMenu;
