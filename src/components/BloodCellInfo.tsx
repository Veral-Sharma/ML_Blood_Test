
import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { BloodCellInfo as BloodCellInfoType } from '@/types';

const bloodCellData: BloodCellInfoType[] = [
  {
    type: 'NEUTROPHIL',
    description: 'The most abundant type of white blood cells, making up 55-70% of your white blood cells.',
    function: 'First responders to infection - they quickly travel to the site of infection to kill invading microorganisms.',
    normalRange: '1,500 - 8,000 cells per microliter',
    color: 'bg-blue-500'
  },
  {
    type: 'LYMPHOCYTE',
    description: 'The second most common type of white blood cell, making up 20-40% of all white blood cells.',
    function: 'Central to the immune response - they include T cells and B cells that fight viral infections and produce antibodies.',
    normalRange: '1,000 - 4,000 cells per microliter',
    color: 'bg-green-500'
  },
  {
    type: 'MONOCYTE',
    description: 'Largest of all white blood cells, comprising 2-8% of the total white blood cell count.',
    function: 'Clean up dead cells, microorganisms, and other debris, and help activate other immune cells.',
    normalRange: '200 - 800 cells per microliter',
    color: 'bg-yellow-500'
  },
  {
    type: 'EOSINOPHIL',
    description: 'Comprise 1-4% of the total white blood cell count and contain distinctive granules.',
    function: 'Combat parasitic infections and respond to allergic reactions and inflammation.',
    normalRange: '50 - 400 cells per microliter',
    color: 'bg-red-500'
  }
];

const BloodCellInfo: React.FC = () => {
  return (
    <motion.div
      className="w-full max-w-3xl mx-auto my-12 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-medical-dark inline-flex items-center">
          <Info className="w-5 h-5 mr-2 text-medical-default" />
          Understanding Blood Cell Types
        </h2>
        <p className="text-gray-600 mt-2">
          Learn about the different types of blood cells our classifier can identify
        </p>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        {bloodCellData.map((cell, index) => (
          <AccordionItem key={cell.type} value={cell.type} className="mb-4 border rounded-lg shadow-sm overflow-hidden">
            <AccordionTrigger className="px-4 py-3 bg-gradient-to-r from-medical-light/30 to-white hover:no-underline">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${cell.color} mr-3`}></div>
                <span className="font-medium">{cell.type}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pt-4 pb-6 bg-white">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Description</h4>
                  <p className="text-sm text-gray-600">{cell.description}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Function</h4>
                  <p className="text-sm text-gray-600">{cell.function}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Normal Range</h4>
                  <p className="text-sm text-gray-600">{cell.normalRange}</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.div>
  );
};

export default BloodCellInfo;
