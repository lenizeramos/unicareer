import React from 'react';
import { IconType } from 'react-icons';

interface BenefitCardProps {
  icon: IconType;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-blue-100 rounded-lg">
          <Icon className="text-blue-600 text-xl" />
        </div>
        <div>
          <h4 className="font-semibold text-lg text-gray-800 mb-2">{title}</h4>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default BenefitCard; 