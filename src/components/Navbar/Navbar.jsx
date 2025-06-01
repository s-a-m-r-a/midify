import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LogIn, Menu, X, User } from "lucide-react";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, doSignOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await doSignOut();
    navigate("/");
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/" onClick={() => setIsOpen(false)}>
          Mid<span>ify</span>
        </Link>
      </div>

      <div className="navbar__mobile-buttons">
        <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div className={`navbar__content ${isOpen ? "open" : ""}`}>
        <ul className="navbar__links">
          <li>
            <Link
              className={isActive("/") ? "active" : ""}
              to="/"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>

          {user && (
            <li>
              <Link
                className={isActive("/mybookings") ? "active" : ""}
                to="/mybookings"
                onClick={() => setIsOpen(false)}
              >
                Bookings
              </Link>
            </li>
          )}

          <li>
            <Link
              className={isActive("/faq") ? "active" : ""}
              to="/faq"
              onClick={() => setIsOpen(false)}
            >
              FAQ
            </Link>
          </li>
          <li>
            <Link
              className={isActive("/contact-us") ? "active" : ""}
              to="/contact-us"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>

        <div className="navbar__auth">
          {!user ? (
            <Link
              className={`auth-link ${isActive("/login") ? "active" : ""}`}
              to="/login"
              onClick={() => setIsOpen(false)}
            >
              <LogIn size={20} />
              <span className="link-text">Login</span>
            </Link>
          ) : (
            <>
              <Link
                className={`auth-link ${isActive("/profile") ? "active" : ""}`}
                to="/profile"
                onClick={() => setIsOpen(false)}
              >
                <User size={20} />
                <span className="link-text">Profile</span>
              </Link>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;