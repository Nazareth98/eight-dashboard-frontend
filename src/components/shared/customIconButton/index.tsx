import React, { ComponentProps } from "react";

interface CustomButtonProps extends ComponentProps<"button"> {
  children: any;
  theme?: string;
}

const CustomIconButton = (props: CustomButtonProps) => {
  let bgColorClass = "";

  switch (props.theme) {
    case "alternate":
      bgColorClass =
        "bg-gray-900 text-gray-700 border-gray-800 hover:border-gray-700 hover:text-gray-600 active:text-gray-800 active:border-gray-800 hover:shadow-gray-900";
      break;
    case "danger":
      bgColorClass =
        "bg-red-950 text-red-700 border-red-900 hover:border-red-800 hover:text-red-600 active:text-red-800 active:border-red-800 hover:shadow-red-900";
      break;
    case "attention":
      bgColorClass =
        "bg-yellow-950 text-yellow-700 border-yellow-900 hover:border-yellow-800 hover:text-yellow-600 active:text-yellow-800 active:border-yellow-800 hover:shadow-yellow-900";
      break;
    default:
      bgColorClass =
        "bg-primary-950 text-primary-700 border-primary-900 hover:border-primary-800 hover:text-primary-600 active:text-primary-800 active:border-primary-800 hover:shadow-primary-900";
      break;
  }

  return (
    <button
      className={`p-1 rounded-md font-medium font-heading transition flex flex-row items-center justify-center gap-2 border-2 ${bgColorClass}`}
      id={props.id}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default CustomIconButton;
