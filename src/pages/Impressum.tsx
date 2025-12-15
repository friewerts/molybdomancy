
import { Link } from 'react-router-dom';

export default function Impressum() {
  return (
    <div className="legal-page detail-page slide-in">
      <Link to="/" className="back-button">← Zurück</Link>
      
      <div className="detail-card general">
        <div className="detail-header">
          <h1 className="detail-title">Impressum</h1>
        </div>
        
        <div className="detail-content legal-content">
          <h2>Angaben gemäß § 5 TMG</h2>
          <p>
            info@neujahrsorakel.de
          </p>

          <h2>Kontakt</h2>
          <p>
            E-Mail: info@neujahrsorakel.de
          </p>

          <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p>
            info@neujahrsorakel.de
          </p>

          <h2>Haftungsausschluss</h2>
          <h3>Haftung für Inhalte</h3>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>

          <h3>Haftung für Links</h3>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
          </p>
        </div>
      </div>
    </div>
  );
}
