
import { Link } from 'react-router-dom';

export default function Datenschutz() {
  return (
    <div className="legal-page detail-page slide-in">
      <Link to="/" className="back-button">← Zurück</Link>
      
      <div className="detail-card general">
        <div className="detail-header">
          <h1 className="detail-title">Datenschutzerklärung</h1>
        </div>
        
        <div className="detail-content legal-content">
          <h2>1. Datenschutz auf einen Blick</h2>
          <h3>Allgemeine Hinweise</h3>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
          </p>

          <h3>Datenerfassung auf dieser Website</h3>
          <p>
            <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
          </p>

          <h2>2. Analyse-Tools und Werbung</h2>
          <h3>Google Analytics</h3>
          <p>
            Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist die Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland.
          </p>
          <p>
            Google Analytics ermöglicht es dem Websitebetreiber, das Verhalten der Websitebesucher zu analysieren. Hierbei erhält der Websitebetreiber verschiedene Nutzungsdaten, wie z. B. Seitenaufrufe, Verweildauer, verwendete Betriebssysteme und Herkunft des Nutzers. Diese Daten werden dem jeweiligen Endgerät des Nutzers zugeordnet. Eine Zuordnung zu einer Geräte-ID erfolgt nicht.
          </p>
          <p>
            Des Weiteren können wir mit Google Analytics u. a. Ihre Maus- und Scrollbewegungen und Klicks aufzeichnen. Ferner verwendet Google Analytics verschiedene Modellierungsansätze, um die erfassten Datensätze zu ergänzen und nutzt Machine-Learning-Technologien bei der Datenanalyse.
          </p>
          <p>
            Google Analytics verwendet Technologien, die die Wiedererkennung des Nutzers zum Zwecke der Analyse des Nutzerverhaltens ermöglichen (z. B. Cookies oder Device-Fingerprinting). Die von Google erfassten Informationen über die Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.
          </p>
          <p>
            Die Nutzung dieses Dienstes erfolgt auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG. Die Einwilligung ist jederzeit widerrufbar.
          </p>

          <h3>Browser Plugin</h3>
          <p>
            Sie können die Erfassung und Verarbeitung Ihrer Daten durch Google verhindern, indem Sie das unter dem folgenden Link verfügbare Browser-Plugin herunterladen und installieren: <a href="https://tools.google.com/dlpage/gaoptout?hl=de" target="_blank" rel="noopener noreferrer">https://tools.google.com/dlpage/gaoptout?hl=de</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
