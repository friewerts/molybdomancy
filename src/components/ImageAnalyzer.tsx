import { useState, useRef } from 'react';
import { classifyImage } from '../services/vision';
import { mobilenetToInterpretation } from '../utils/mapping';
import interpretationsData from '../data/interpretations.json';
import type { Interpretation } from '../types';

interface Props {
  onAnalysisComplete: (results: Interpretation[]) => void;
}

export default function ImageAnalyzer({ onAnalysisComplete }: Props) {
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getRandomShapes = (count: number): Interpretation[] => {
    const data = interpretationsData as unknown as Interpretation[];
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAnalyzing(true);
    setError(null);

    try {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      await new Promise((resolve) => { img.onload = resolve; });

      const predictions = await classifyImage(img);
      console.log('Predictions:', predictions);

      const foundIds = new Set<string>();
      
      for (const p of predictions) {
        const labels = p.className.split(',').map(s => s.trim().toLowerCase());
        for (const label of labels) {
           const interpretationId = mobilenetToInterpretation[label];
           if (interpretationId) {
             foundIds.add(interpretationId);
           }
        }
      }

      let results: Interpretation[] = [];
      const allInterpretations = interpretationsData as unknown as Interpretation[];
      
      if (foundIds.size > 0) {
        results = allInterpretations.filter(i => foundIds.has(i.id));
      }

      if (results.length === 0) {
        results = getRandomShapes(3);
      }

      onAnalysisComplete(results);
      URL.revokeObjectURL(img.src);
    } catch (err) {
      console.error(err);
      setError('Fehler bei der Bildanalyse.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="image-analyzer">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      
      <button 
        className="upload-btn" 
        onClick={() => fileInputRef.current?.click()}
        disabled={analyzing}
      >
        {analyzing ? 'Analysiere...' : '📷 Foto hochladen'}
      </button>

      {error && <p className="error-msg">{error}</p>}
    </div>
  );
}
