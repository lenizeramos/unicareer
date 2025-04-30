import React from "react";
import { IconType } from "react-icons";

interface BenefitCardProps {
  icon?: IconType;
  title: string;
  description?: string;
  backgroundColor?: string,
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  title,
  backgroundColor
}) => {
  return (
    <div className={`p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow ${backgroundColor}`}>
      <div className={`flex justify-center`}>
              <div>
          <h4 className="font-semibold text-lg text-gray-800 mb-2 text-center">{title}</h4>
        </div>
      </div>
    </div>
  );
};

export default BenefitCard;
