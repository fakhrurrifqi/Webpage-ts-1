import { useAuth } from "@/hooks/useAuth";
import { handleSignOut } from "@/lib/authUtils";
import { useLocation, useNavigate } from "react-router";
import AuthButtons from "./AuthButtons";

interface AuthNavLinksProps {
  isMobile?: boolean;
  className?: string;
  itemClassName?: string;
}

const AuthNavLinks: React.FC<AuthNavLinksProps> = ({
  isMobile = false,
  className = "items-center space-x-6",
  itemClassName = "",
}) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const commonMobileProps = isMobile ? { isMobile: true } : {};
  const signOutHandler = () => handleSignOut(navigate);

  const renderButton = (
    props: React.ComponentProps<typeof AuthButtons>,
    key: string,
  ) => {
    if (isMobile) {
      return (
        <li key={key} className={itemClassName}>
          {<AuthButtons {...commonMobileProps} {...props} />}
        </li>
      );
    }
    return <AuthButtons key={key} {...commonMobileProps} {...props} />;
  };

  return (
    <ul className={`flex ${isMobile ? "flex-col space-y-4" : className}`}>
      {currentUser ? (
        <>
          {location.pathname !== "/dashboard" &&
            renderButton(
              { children: "Dashboard", to: "/dashboard" },
              "dashboard",
            )}
          {location.pathname !== "/profile" &&
            renderButton({ children: "Profile", to: "/profile" }, "profile")}
          {renderButton(
            {
              children: "Sign Out",
              onClick: signOutHandler,
              variant: "button",
            },
            "signOut",
          )}
        </>
      ) : (
        <>
          {renderButton({ children: "Login", to: "/signin" }, "signin")}
          {renderButton({ children: "Sign Up", variant: "button" }, "signup")}
        </>
      )}
    </ul>
  );
};

export default AuthNavLinks;
