import { useParams, Link } from 'react-router-dom';
import interpretationsData from '../data/interpretations.json';
import type { Interpretation } from '../types';

const allInterpretations: Interpretation[] = interpretationsData as Interpretation[];

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const shape = allInterpretations.find(item => item.id === id);

  if (!shape) {
    return (
      <div className="detail-container">
        <h2>Form nicht gefunden</h2>
        <Link to="/" className="back-link">Zurück zur Übersicht</Link>
      </div>
    );
  }

  return (
    <div className="detail-page slide-in">
      <Link to="/" className="back-button">← Zurück</Link>
      
      <div className={`detail-card cat-${shape.category || 'general'}`}>
        <div className="detail-header">
          <h1 className="detail-title">{shape.name}</h1>
          <span className="detail-category">{getCategoryLabel(shape.category)}</span>
        </div>
        
        <div className="detail-content">
          <p className="main-meaning">{shape.meaning}</p>
          
          <div className="extended-meaning">
            <h3>Tiefergehende Bedeutung</h3>
            <p>
              Das Symbol "{shape.name}" ist ein traditionelles Zeichen in der Wahrsagerei. 
              {shape.category === 'luck' && ' Es deutet auf eine glückhafte Fügung des Schicksals hin.'}
              {shape.category === 'warning' && ' Es mahnt zur Vorsicht und Aufmerksamkeit.'}
              {shape.category === 'love' && ' Es steht in enger Verbindung mit Herzensangelegenheiten.'}
              {shape.category === 'finance' && ' Es betrifft materielle Aspekte und Wohlstand.'}
              <br/><br/>
              Achten Sie auf die genauen Umrisse: Sind sie klar oder verschwommen? Eine klare Form verstärkt die positive Bedeutung.
            </p>
          </div>
          
          <div className="similar-shapes">
            <h3>Ähnliche Formen</h3>
            <div className="similar-grid">
              {allInterpretations
                .filter(i => i.category === shape.category && i.id !== shape.id)
                .slice(0, 3)
                .map(similar => (
                  <Link to={`/interpretation/${similar.id}`} key={similar.id} className="similar-item">
                    {similar.name}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getCategoryLabel(cat?: string) {
  const labels: Record<string, string> = {
    love: 'Liebe & Beziehung',
    luck: 'Glück & Schicksal',
    finance: 'Geld & Erfolg',
    warning: 'Warnung & Vorsicht',
    general: 'Allgemeines Symbol'
  };
  return labels[cat || 'general'] || cat || 'Symbol';
}
