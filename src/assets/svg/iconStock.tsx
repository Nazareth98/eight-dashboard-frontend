import SvgType from "../../types/svgType";

const IconStock = (props: SvgType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      className={props.fill ? props.fill : "fill-black"}
      height={props.width ? props.width : "30px"}
      width={props.width ? props.width : "30px"}
    >
      <path d="M200-80q-33 0-56.5-23.5T120-160v-451q-18-11-29-28.5T80-680v-120q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v120q0 23-11 40.5T840-611v451q0 33-23.5 56.5T760-80H200Zm0-520v440h560v-440H200Zm-40-80h640v-120H160v120Zm240 280h160q17 0 28.5-11.5T600-440q0-17-11.5-28.5T560-480H400q-17 0-28.5 11.5T360-440q0 17 11.5 28.5T400-400Zm80 20Z" />
    </svg>
  );
};

export default IconStock;