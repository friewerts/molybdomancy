import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { trackEvent } from '../utils/analytics';
import interpretationsData from '../data/interpretations.json';
import type { Interpretation } from '../types';

const allInterpretations: Interpretation[] = interpretationsData as Interpretation[];

export default function Detail() {


  const { id } = useParams<{ id: string }>();
  const shape = allInterpretations.find(item => item.id === id);

  useEffect(() => {
    if (shape) {
      trackEvent('view_shape', {
        shape_id: shape.id,
        category: shape.category || 'general'
      });
    }
  }, [shape]);

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

          
          <div className="extended-meaning">
            <h3>Die Botschaft des Orakels</h3>
            <p>
              {shape.meaning}
              <br/><br/>
              Achten Sie auf die genauen Umrisse: Sind sie klar oder verschwommen? Eine klare Form verstärkt die positive Energie.
            </p>
          </div>
          
          <div className="similar-shapes">
            <h3>Ähnliche Formen</h3>
            <div className="similar-grid">
              {allInterpretations
                .filter(i => (i.shapeType && i.shapeType === shape.shapeType) && i.id !== shape.id)
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
