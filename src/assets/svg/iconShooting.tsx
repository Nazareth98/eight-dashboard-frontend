import CustomSvg, { SvgProps } from "../../components/shared/customSvg";

const IconShooting = (props: SvgProps) => {
  return (
    <CustomSvg {...props}>
      <path d="M792-443 176-183q-20 8-38-3.5T120-220v-520q0-22 18-33.5t38-3.5l616 260q25 11 25 37t-25 37ZM200-280l474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
    </CustomSvg>
  );
};

export default IconShooting;
