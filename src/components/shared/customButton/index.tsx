import React, { ComponentProps, FC, ReactNode } from "react";

interface CustomButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
  theme?: "alternate" | "danger" | "attention" | "default";
}

const themeClasses: { [key in CustomButtonProps["theme"]]: string } = {
  alternate:
    "bg-gray-900 text-gray-400 hover:bg-gray-800 active:bg-gray-900 active:text-gray-600",
  danger:
    "bg-red-600 text-red-950 hover:bg-red-500 active:text-red-800 active:bg-red-600 active:text-red-800",
  attention:
    "bg-yellow-600 text-yellow-950 hover:bg-yellow-500 active:text-yellow-800 active:bg-yellow-600 active:text-yellow-800",
  default:
    "bg-primary-600 text-primary-950 hover:bg-primary-500 active:text-primary-800 active:bg-primary-600 active:text-primary-800",
};

const CustomButton: FC<CustomButtonProps> = ({
  children,
  theme = "default",
  ...rest
}) => {
  const bgColorClass = themeClasses[theme];

  return (
    <button
      className={`px-3 py-1.5 rounded-md font-medium font-heading transition flex flex-row items-center justify-center gap-2 active:translate-y-px ${bgColorClass}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default CustomButton;
