import { ComponentProps } from "react";

interface CustomButtonProps extends ComponentProps<"button"> {
  children: any;
  theme?: string;
}

const CustomButton = (props: CustomButtonProps) => {
  let bgColorClass = "";

  switch (props.theme) {
    case "alternate":
      bgColorClass =
        "bg-gray-900 text-gray-400 hover:bg-gray-700 hover:border-gray-800 active:text-gray-800 active:bg-gray-600 active:text-gray-800";
      break;
    case "danger":
      bgColorClass =
        "bg-red-600  text-red-950 hover:bg-red-500 hover:border-red-800 active:text-red-800 active:bg-red-600 active:text-red-800";
      break;
    case "attention":
      bgColorClass =
        "bg-yellow-600  text-yellow-950 hover:bg-yellow-500 hover:border-yellow-800 active:text-yellow-800 active:bg-yellow-600 active:text-yellow-800";
      break;
    default:
      bgColorClass =
        "bg-primary-600  text-primary-950 hover:bg-primary-500 hover:border-primary-800 active:text-primary-800 active:bg-primary-600 active:text-primary-800";
      break;
  }

  return (
    <button
      className={`px-3 py-1.5 rounded-md font-medium font-heading transition flex flex-row items-center justify-center gap-2 active:translate-y-px ${bgColorClass}`}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default CustomButton;
