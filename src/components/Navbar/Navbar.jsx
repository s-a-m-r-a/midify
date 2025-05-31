import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LogIn, Menu, X, Sun, Moon, User } from "lucide-react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useTheme } from "../../context/ThemeContext";
import "./Navbar.css";


function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, doSignOut } = useAuth();
  const [ isOpen, setIsOpen ] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await doSignOut();
    toast.success("Log out was successful!");
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
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`navbar__content ${isOpen ? 'open' : ''}`}>
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
          {/* <li>
            <Link 
              className={location.pathname.includes("/movies") ? "active" : ""} 
              to="/movies/1"
              onClick={() => setIsOpen(false)}
            >
              Movies
            </Link>
          </li> */}
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

          {user && (
            <>
              <li>
                <Link 
                  className={isActive("/mybookings") ? "active" : ""} 
                  to="/mybookings"
                  onClick={() => setIsOpen(false)}
                >
                Bookings
                </Link>
              </li>
              <li>
                <Link 
                  className={isActive("/profile") ? "active" : ""} 
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                >
                  <User size={20} />
                  <span className="link-text">Profile</span>
                </Link>
              </li>
            </>
          )}
        </ul>

        <div className="navbar__auth">
          <button className="theme-toggle desktop" onClick={toggleTheme}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
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
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;