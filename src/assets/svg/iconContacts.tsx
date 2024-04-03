import SvgType from "../../types/svgType";

const IconContacts = (props: SvgType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      className={props.fill ? props.fill : "fill-black"}
      height={props.width ? props.width : "30px"}
      width={props.width ? props.width : "30px"}
    >
      <path d="M200-40q-17 0-28.5-11.5T160-80q0-17 11.5-28.5T200-120h560q17 0 28.5 11.5T800-80q0 17-11.5 28.5T760-40H200Zm0-800q-17 0-28.5-11.5T160-880q0-17 11.5-28.5T200-920h560q17 0 28.5 11.5T800-880q0 17-11.5 28.5T760-840H200Zm280 400q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm70-80q45-56 109-88t141-32q77 0 141 32t109 88h70v-480H160v480h70Zm118 0h264q-29-20-62.5-30T480-280q-36 0-69.5 10T348-240Zm132-280q-17 0-28.5-11.5T440-560q0-17 11.5-28.5T480-600q17 0 28.5 11.5T520-560q0 17-11.5 28.5T480-520Zm0 40Z" />
    </svg>
  );
};

export default IconContacts;