export interface Interpretation {
  id: string;
  name: string;
  meaning: string;
  category?: 'love' | 'luck' | 'finance' | 'general' | 'warning';
  synonyms?: string[];
  shapeType?: 'animal' | 'object' | 'plant' | 'human' | 'symbol' | 'nature';
}
