import { useState, useMemo } from 'react';
import interpretationsData from './data/interpretations.json';
import type { Interpretation } from './types';
import './index.css'; // Ensure CSS is imported

const allInterpretations: Interpretation[] = interpretationsData as Interpretation[];

function App() {
  const [query, setQuery] = useState('');

  const filteredShapes = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return allInterpretations;
    return allInterpretations.filter(item => 
      item.name.toLowerCase().includes(q) || 
      item.meaning.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div>
      <h1>Molybdomancy</h1>
      <p className="subtitle">Entdecke die Bedeutung deiner Gießformen</p>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Suche nach Formen (z.B. Herz, Adler)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
          autoFocus
        />
      </div>

      <div className="shape-grid">
        {filteredShapes.length > 0 ? (
          filteredShapes.map((shape) => (
            <div key={shape.id} className={`shape-card cat-${shape.category || 'general'}`}>
              <h2 className="shape-name">{shape.name}</h2>
              <p className="shape-meaning">{shape.meaning}</p>
              {shape.category && <span className="shape-category">{getCategoryLabel(shape.category)}</span>}
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>Keine Formen gefunden, die "{query}" enthalten.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function getCategoryLabel(cat: string) {
  const labels: Record<string, string> = {
    love: 'Liebe',
    luck: 'Glück',
    finance: 'Geld',
    warning: 'Warnung',
    general: 'Allgemein'
  };
  return labels[cat] || cat;
}

export default App;
