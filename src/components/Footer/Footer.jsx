import "./Footer.css";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF,
  faInstagram,
  faTwitter,
  faTiktok,
  faTelegram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import Cards from '../../assets/cards.svg'

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <a href="/" className="footer-brand">
            <b style={{color: "rgba(255, 255, 255, 0.9)"}}>Mid</b><b className="accent">ify</b>
          </a>
        </div>
        
        <div className="footer-section">
          <h3>Information</h3>
          <div className="footer-links">
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <div className="footer-section">
          <h3>Follow us</h3>
          <div className="socials">
            <a href="https://www.facebook.com/" className="social-item" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://www.instagram.com/" className="social-item" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://x.com/" className="social-item" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://www.tiktok.com/" className="social-item" aria-label="Tiktok" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTiktok} />
            </a>
            <a href="https://t.me/+qTojFFELFLQ2Y2Y6" className="social-item" aria-label="Telegram" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTelegram} />
            </a>
            <a href="https://www.youtube.com/" className="social-item" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Security</h3>
          <p className="security-text">All payments are protected by 3D Secure</p>
          <div className="payment-cards">
            <img src={Cards} alt="Visa" className="card-logo" />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Midify. All rights reserved.</p>
      </div>
    </div>
  );
}