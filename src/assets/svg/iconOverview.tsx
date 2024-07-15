import CustomSvg, { SvgProps } from "../../components/shared/customSvg";

const IconOverview = (props: SvgProps) => {
  return (
    <CustomSvg {...props}>
      <path d="M120-200q-33 0-56.5-23.5T40-280v-400q0-33 23.5-56.5T120-760h400q33 0 56.5 23.5T600-680v400q0 33-23.5 56.5T520-200H120Zm0-80h400v-400H120v400Zm560 80v-560h80v560h-80Zm160 0v-560h80v560h-80Zm-720-80v-400 400Z" />
    </CustomSvg>
  );
};

export default IconOverview;
