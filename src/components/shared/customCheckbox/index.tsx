/* eslint-disable react/prop-types */
import { useState } from "react";

const CustomCheckbox = ({ label, checked, setChecked, onChange }) => {
  const handleCheckboxChange = () => {
    setChecked(!checked);
    console.log(checked);
  };

  return (
    <div className="flex gap-1">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange ? onChange : handleCheckboxChange}
      />
      <label className="text-gray-500 text-sm" style={{ marginRight: "8px" }}>
        {label}
      </label>
    </div>
  );
};

export default CustomCheckbox;
