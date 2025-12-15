
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-links-main">
        {/* Placeholder for future external links or social media */}
        <span className="footer-brand">Neujahrs Orakel</span>
      </div>
      
      <div className="footer-links-legal">
        <Link to="/impressum">Impressum</Link>
        <span className="separator">•</span>
        <Link to="/datenschutz">Datenschutz</Link>
        <span className="separator">•</span>
        <span className="copyright">© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
