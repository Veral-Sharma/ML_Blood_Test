import React from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClassificationResult } from '@/types';

// Blood cell descriptions
const bloodCellDescriptions: Record<string, string> = {
  'NEUTROPHIL': 'First responders to infection - they quickly travel to the site of infection to kill invading microorganisms. They make up 55-70% of white blood cells.',
  'LYMPHOCYTE': 'Central to the immune response - they include T cells and B cells that fight viral infections and produce antibodies. They comprise 20-40% of white blood cells.',
  'MONOCYTE': 'The largest white blood cells that clean up dead cells and debris. They help activate other immune cells and make up 2-8% of white blood cells.',
  'EOSINOPHIL': 'Specialized cells that combat parasitic infections and respond to allergic reactions. They comprise 1-4% of white blood cells and contain distinctive granules.'
};

interface ResultCardProps {
  result: ClassificationResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  if (!result.prediction || !result.imageSrc) {
    return null;
  }

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto my-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass-panel overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-medical-dark/10 to-medical-accent/10 pb-4">
          <CardTitle className="flex items-center justify-center text-2xl text-medical-dark">
            <Activity className="w-6 h-6 mr-2 text-medical-accent" />
            Classification Results
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-[1fr_2fr] gap-6">
            <motion.div
              className="order-1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <div className="relative rounded-lg overflow-hidden shadow-lg border border-gray-200">
                <img 
                  src={result.imageSrc} 
                  alt={`${result.prediction} blood cell`}
                  className="w-full h-auto object-cover max-h-[200px]"
                />
              </div>
            </motion.div>
            
            <motion.div
              className="order-2 space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-medical-default" />
                  Cell Type
                </h3>
                <div className="text-2xl font-bold text-medical-dark mb-3">{result.prediction}</div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {bloodCellDescriptions[result.prediction]}
                </p>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ResultCard;
