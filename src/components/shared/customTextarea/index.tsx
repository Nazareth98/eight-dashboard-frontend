import React from "react";

interface TextareaProps {
  label: string;
  placeholder: string;
  setValue: (value: string) => void;
  rows?: number;
}

const CustomTextarea = (props: TextareaProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue(event.target.value);
  };

  return (
    <div className="flex flex-col gap-1">
      <label
        className="text-gray-200 text-sm font-medium"
        htmlFor={props.label}
      >
        {props.label}
      </label>
      <textarea
        id={props.label}
        className="bg-gray-900 p-2 border-2 border-gray-800 rounded-lg text-gray-100 focus:outline-none focus:border-primary-300 focus:bg-gray-900 placeholder:italic placeholder:text-gray-400 placeholder:text-sm resize-none"
        placeholder={props.placeholder}
        rows={props.rows ? props.rows : 5}
        value={props.value}
        onChange={handleChange}
      ></textarea>
    </div>
  );
};

export default CustomTextarea;
