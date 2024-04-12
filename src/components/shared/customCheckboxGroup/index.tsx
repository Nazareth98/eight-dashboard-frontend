import React, { useState } from "react";

const CheckboxGroup = ({ options, onChange, colSpan, label }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleCheckboxChange = (option) => {
    if (selectedOption === option) {
      setSelectedOption(null);
      onChange(null);
    } else {
      setSelectedOption(option);
      onChange(option);
    }
  };

  return (
    <div className={`flex flex-col gap-1 relative col-span-${colSpan}`}>
      {label && (
        <label className="text-gray-200 text-sm font-medium" htmlFor={label}>
          {label}
        </label>
      )}
      <div className="flex items-center gap-4">
        {options.map((option) => (
          <label key={option} className="text-gray-100">
            <input
              type="checkbox"
              checked={selectedOption === option}
              onChange={() => handleCheckboxChange(option)}
            />{" "}
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;
