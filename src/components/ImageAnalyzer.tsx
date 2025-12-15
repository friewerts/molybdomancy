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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getRandomShapes = (count: number): Interpretation[] => {
    const data = interpretationsData as unknown as Interpretation[];
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
      // Fail silently to keep seamless UI
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="image-analyzer-trigger">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      
      <button 
        className="camera-icon-btn" 
        onClick={() => fileInputRef.current?.click()}
        disabled={analyzing}
        title="Foto analysieren"
      >
        {analyzing ? (
           <span className="animate-spin">↻</span>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
        )}
      </button>
    </div>
  );
}
