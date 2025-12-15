import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ImageAnalyzer from '../components/ImageAnalyzer';
import interpretationsData from '../data/interpretations.json';
import type { Interpretation } from '../types';



export default function Home() {
  const [query, setQuery] = useState('');
  const [imageResults, setImageResults] = useState<Interpretation[] | null>(null);
  
  const allInterpretations = interpretationsData as unknown as Interpretation[];

  const filteredInterpretations = useMemo(() => {
    // If user is searching repeatedly with text, it overrides image results
    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      return allInterpretations.filter(item => 
        item.name.toLowerCase().includes(lowerQuery) ||
        item.synonyms?.some(s => s.toLowerCase().includes(lowerQuery))
      );
    }
    
    // If no text query but we have image results, show those
    if (imageResults) {
      return imageResults;
    }

    // Default: Show all
    return allInterpretations;
  }, [query, imageResults, allInterpretations]);

  const handleImageAnalysis = (results: Interpretation[]) => {
    setQuery(''); // Clear text search
    setImageResults(results); // Set image results
  };

  const handleTextSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value) {
      setImageResults(null); // Clear image results when typing
    }
  };

  return (
    <div className="page-home">
      <div className="hero-section">
        <h1>Neujahrs Orakel</h1>
        <p className="subtitle">Entdecke die Bedeutung deiner Form</p>
      </div>

      <div className="search-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Suche nach Formen..."
            value={query}
            onChange={handleTextSearch}
            className="search-input"
            autoFocus
          />
          <ImageAnalyzer onAnalysisComplete={handleImageAnalysis} />
        </div>
      </div>

      <div className="shape-grid">
        {filteredInterpretations.length > 0 ? (
          filteredInterpretations.map((shape) => (
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
