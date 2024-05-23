import { MouseEventHandler } from "react";

interface CustomButtonProps {
  type?: string;
  className?: string;
  onClick?: (event: MouseEventHandler<HTMLButtonElement>) => void;
  disabled?: boolean;
  children: any;
}

const CustomButton = (props: CustomButtonProps) => {
  let bgColorClass = "";
  let textColorClass = "";

  switch (props.type) {
    case "alternate":
      bgColorClass =
        "border-2 border-gray-300 hover:bg-gray-800 active:bg-gray-700";
      textColorClass = "text-gray-300";
      break;
    case "danger":
      bgColorClass =
        "bg-red-800 hover:bg-red-700 hover:border-red-600 active:bg-red-900";
      textColorClass = "text-red-100";
      break;
    case "attention":
      bgColorClass = "bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-600";
      textColorClass = "text-yellow-900";
      break;
    default:
      bgColorClass =
        "bg-primary-400 hover:bg-primary-300 active:bg-primary-600";
      textColorClass = "text-primary-900";
      break;
  }

  return (
    <button
      className={`px-4 py-2 rounded font-semibold font-heading transition flex flex-row items-center justify-center gap-2 active:translate-y-1 ${bgColorClass} ${textColorClass} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled ? props.disabled : false}
      id={props.id}
    >
      {props.children}
    </button>
  );
};

export default CustomButton;
