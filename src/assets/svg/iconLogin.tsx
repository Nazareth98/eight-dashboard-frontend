import CustomSvg, { SvgProps } from "../../components/shared/customSvg";

const IconLogin = (props: SvgProps) => {
  return (
    <CustomSvg {...props}>
      <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
    </CustomSvg>
  );
};

export default IconLogin;
