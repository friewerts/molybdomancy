import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import interpretationsData from '../data/interpretations.json';
import type { Interpretation } from '../types';

const allInterpretations: Interpretation[] = interpretationsData as Interpretation[];

export default function Home() {
  const [query, setQuery] = useState('');

  const filteredShapes = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return allInterpretations;
    return allInterpretations.filter(item => 
      item.name.toLowerCase().includes(q) ||
      item.synonyms?.some(s => s.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div className="page-container">
      <header>
        <h1>Molybdomancy</h1>
        <p className="subtitle">Entdecke die Bedeutung deiner Gießformen</p>
      </header>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Suche nach Formen..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
          autoFocus
        />
      </div>

      <div className="shape-grid">
        {filteredShapes.length > 0 ? (
          filteredShapes.map((shape) => (
            <Link to={`/interpretation/${shape.id}`} key={shape.id} className={`shape-card-link`}>
              <div className={`shape-card cat-${shape.category || 'general'}`}>
                <h2 className="shape-name">{shape.name}</h2>
                <span className="click-hint">Tippen für Bedeutung</span>
              </div>
            </Link>
          ))
        ) : (
          <div className="no-results">
            <p>Keine Formen gefunden.</p>
          </div>
        )}
      </div>
    </div>
  );
}
