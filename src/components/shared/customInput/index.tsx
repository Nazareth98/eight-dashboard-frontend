import { ReactElement, ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
  inputValue: any;
  setValue?: (value: any) => void;
  label?: string;
  icon?: ReactElement;
  onKeyPress?: any;
  onChange?: (props: any) => void;
  colSpan?: string;
}

const CustomInput = (props: InputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue(event.target.value);
  };

  return (
    <div className={`flex flex-col gap-1 relative col-span-${props.colSpan}`}>
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
        className="bg-gray-900 py-2 px-1.5 border-2 border-gray-800 rounded text-gray-100 focus:outline-none focus:border-primary-400 focus:bg-gray-900 placeholder:italic placeholder:text-gray-600 placeholder:text-sm"
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
