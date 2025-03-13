
export interface ClassificationResult {
  prediction: string | null;
  confidence: number | null;
  imageSrc: string | null;
}

export type BloodCellType = 'EOSINOPHIL' | 'LYMPHOCYTE' | 'MONOCYTE' | 'NEUTROPHIL';

export interface BloodCellInfo {
  type: BloodCellType;
  description: string;
  function: string;
  normalRange: string;
  color: string;
}
