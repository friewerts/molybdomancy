
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-links">
        <Link to="/impressum">Impressum</Link>
        <span className="separator">•</span>
        <Link to="/datenschutz">Datenschutz</Link>
      </div>
      <p className="copyright">© {new Date().getFullYear()} Neujahrs Orakel</p>
    </footer>
  );
}
