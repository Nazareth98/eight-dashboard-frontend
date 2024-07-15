import { ComponentProps } from "react";

interface SelectProps extends ComponentProps<"select"> {
  label: string;
  options: any[];
  onChange: any;
}

const CustomSelect = ({ label, options, onChange }: SelectProps) => {
  return (
    <select
      className="bg-gray-800 border-2 border-gray-700 text-gray-300 text-sm rounded focus:ring-primary focus:border-primary-400 block w-full p-2.5"
      onChange={onChange}
    >
      <option value="">{label}</option>
      {options?.map((option) => (
        <option
          key={option.value || option.id || option.categoryId} // gambiarra
          value={option.value || option.id || option.categoryId} // gambiarra
        >
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default CustomSelect;
