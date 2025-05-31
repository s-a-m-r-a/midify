import "./Footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF,
  faInstagram,
  faTwitter,
  faTiktok,
  faTelegram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <div className="footer">
      <a href="/" className="footer-brand">
       <b>Mid</b><b className="accent">ify</b>
      </a>
      <div className="socials">
        <a href="https://www.facebook.com/" className="social-item" aria-label="Facebook" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
        <a href="https://www.instagram.com/" className="social-item" aria-label="Instagram" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://x.com/" className="social-item" aria-label="Twitter" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="https://www.tiktok.com/" className="social-item" aria-label="Tiktok" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faTiktok} />
        </a>
        <a href="https://t.me/+qTojFFELFLQ2Y2Y6" className="social-item" aria-label="Telegram" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faTelegram} />
        </a>
        <a href="https://www.youtube.com/" className="social-item" aria-label="YouTube" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faYoutube} />
        </a>
      </div>
    </div>
  );
};
