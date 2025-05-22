import { Link, useNavigate } from "react-router-dom";
import { useAuthListener } from "@/auth/useAuthListener";
import { useEffect, useRef, useState } from "react";
import { signOutUser } from "@/auth/signOutUser";

const UserSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const user = useAuthListener();

  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (user) {
    const initials =
      user.displayName
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "U";

    return (
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="w-10 h-10 rounded-full bg-[#003366] text-white font-semibold flex items-center justify-center hover:scale-105 transition"
          aria-label="User menu"
        >
          {initials}
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg text-black z-50">
            <button
              onClick={() => {
                navigate("/profile");
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-t-lg"
            >
              My Profile
            </button>
            <button
              onClick={() => {
                handleSignOut();
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to="/signin"
      className="px-5 py-1 font-semibold whitespace-nowrap bg-white text-[#003366] border border-[#003366] hover:bg-[#2A9D8F] hover:text-white rounded-2xl shadow-sm hover:shadow-md hover:scale-105 transition"
    >
      Sign In
    </Link>
  );
};

export default UserSection;
