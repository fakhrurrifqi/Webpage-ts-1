import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import AuthNavLinks from "./AuthNavLinks";
import MobileMenu from "./MobileMenu";

interface NavLink {
  href: string;
  label: string;
}

const mainNavLinks: NavLink[] = [
  { href: "/#hero", label: "Home" },
  { href: "/#choose", label: "Features" },
  { href: "/#contact", label: "Contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial check in case page loads already scrolled
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobileMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        className={`border-border fixed top-0 z-20 flex w-full items-center justify-between border-b px-6 py-4 transition-all duration-300 ease-in-out ${
          scrolled ? "bg-background/70 backdrop-blur-md" : "bg-background"
        }`}
      >
        <div className="flex items-center space-x-6">
          <a
            href="/#hero"
            className="text-foreground dark:text-primary text-2xl font-bold"
          >
            Brand
          </a>
          <ul className="text-accent-foreground dark:text-accent-foreground hidden items-center space-x-6 md:flex">
            {mainNavLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="hover:text-muted-foreground dark:hover:text-muted-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section: Theme Toggle and Auth Buttons */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <ThemeToggle className="text-accent-foreground dark:text-accent-foreground hover:text-muted-foreground dark:hover:text-muted-foreground cursor-pointer" />

          {/* Desktop Auth Links */}
          <div className="hidden md:flex">
            <AuthNavLinks className="text-accent-foreground dark:text-accent-foreground space-x-6" />
          </div>

          {/* Mobile Burger Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMenuOpen(true)}
              className="text-foreground hover:text-muted-foreground text-3xl focus:outline-none"
              aria-label="Open menu" // Accessibility
              aria-expanded={menuOpen} // Accessibility
              aria-controls="mobile-menu" // Accessibility (matches ID on MobileMenu if added)
            >
              ☰
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile Menu Component */}
      <MobileMenu
        isOpen={menuOpen}
        onClose={closeMobileMenu}
        navLinks={mainNavLinks}
        // Add id="mobile-menu" if using aria-controls on the burger button
      />

      {/* Optional: Overlay when mobile menu is open */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true" // Hide from screen readers, menu itself is the focus
        />
      )}
    </>
  );
};

export default Navbar;
