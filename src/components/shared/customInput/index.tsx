import { ReactElement } from "react";

interface InputProps {
  placeholder?: string;
  inputValue: any;
  setValue?: (value: any) => void;
  type?: string;
  label?: string;
  icon?: ReactElement;
  onKeyPress?: any;
  onChange?: (props: any) => void;
}

const CustomInput = (props: InputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue(event.target.value);
  };

  return (
    <div className="flex flex-col gap-1 relative">
      {props.label && (
        <label
          className="text-gray-200 text-sm font-medium"
          htmlFor={props.label}
        >
          {props.label}
        </label>
      )}
      <input
        id={props.label}
        className="bg-gray-800 p-2 border-2 border-gray-700 rounded text-gray-100 focus:outline-none focus:border-primary-300 focus:bg-gray-900 placeholder:italic placeholder:text-gray-400 placeholder:text-sm"
        type={props.type}
        placeholder={props.placeholder}
        value={props.inputValue}
        onChange={props.onChange ? props.onChange : handleChange}
        {...props}
      />
      <div
        className={props.label ? "float-icon" : "float-icon -translate-y-1/2"}
      >
        {props.icon}
      </div>
    </div>
  );
};

export default CustomInput;
