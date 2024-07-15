import { ComponentProps } from "react";

interface SvgType extends ComponentProps<"button"> {
  id?: number;
  width?: string;
  fill?: string;
  onClick?: (event: MouseEvent) => void;
}

export default SvgType;
