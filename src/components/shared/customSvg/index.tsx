import React, { ComponentProps } from "react";

export interface SvgProps extends ComponentProps<"svg"> {}

interface CustomSvgProps extends SvgProps {
  children: React.ReactNode;
}

const CustomSvg = (props: CustomSvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      className={props.fill ? props.fill : "fill-black"}
      height={props.width ? props.width : "30px"}
      width={props.width ? props.width : "30px"}
      {...props}
    >
      {props.children}
    </svg>
  );
};

export default CustomSvg;
