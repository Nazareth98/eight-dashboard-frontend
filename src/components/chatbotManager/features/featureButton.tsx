import React, { ComponentProps, ReactNode } from "react";
import CustomButton from "../../shared/customButton";
import { CircleDollarSign, Send } from "lucide-react";

interface FeatureButtoProps {
  id?: string;
  label: string;
  buttonText: string;
  buttonTheme?: string;
  buttonIcon: ReactNode;
  icon: ReactNode;
  onClick?: any;
}

const FeatureButton = ({
  id,
  onClick,
  label,
  buttonText,
  buttonTheme,
  buttonIcon,
  icon,
}: FeatureButtoProps) => {
  return (
    <div className="w-full flex items-center gap-2">
      <div className="text-gray-300">{icon}</div>
      <div className="w-full">
        <p className="text-gray-200 font-heading">{label}</p>
      </div>
      <div className="w-1 h-6 bg-gray-900"></div>
      <div className="fade-right">
        <CustomButton id={id} onClick={onClick} theme={buttonTheme}>
          {buttonIcon}
          {buttonText}
        </CustomButton>
      </div>
    </div>
  );
};

export default FeatureButton;
