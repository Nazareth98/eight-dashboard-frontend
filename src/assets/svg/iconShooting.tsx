import SvgType from "../../types/svgType";

function IconShooting(props: SvgType) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={props.fill ? props.fill : "fill-black"}
      height={props.width ? props.width : "30px"}
      width={props.width ? props.width : "30px"}
    >
      <path d="M20 5H9c-1.1 0-2 .9-2 2v14l4-4h9c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m0 10h-9.8L9 16.2V7h11v8M3 7c-.6 0-1 .4-1 1s.4 1 1 1h2V7H3m-1 4c-.6 0-1 .4-1 1s.4 1 1 1h3v-2H2m-1 4c-.6 0-1 .4-1 1s.4 1 1 1h4v-2H1z" />
    </svg>
  );
}

export default IconShooting;
