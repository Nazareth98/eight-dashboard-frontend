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
        " border-2 border-red-500 hover:bg-red-950 hover:border-red-600 active:bg-red-900";
      textColorClass = "text-red-500";
      break;
    case "attention":
      bgColorClass =
        "bg-yellow-300 border-2 border-yellow-300 hover:bg-yellow-400 hover:border-yellow-400 active:bg-yellow-500";
      textColorClass = "text-yellow-950";
      break;
    default:
      bgColorClass =
        "border-2 border-primary-300 hover:bg-primary-950 hover:border-primary-300 active:bg-primary-900";
      textColorClass = "text-primary-300";
      break;
  }

  return (
    <button
      className={`px-4 py-2 rounded font-medium transition flex flex-row items-center justify-center gap-2 ${bgColorClass} ${textColorClass} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled ? props.disabled : false}
    >
      {props.children}
    </button>
  );
};

export default CustomButton;
