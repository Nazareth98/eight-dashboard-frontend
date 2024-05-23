interface SubtitlePropsType {
  icon: JSX.Element;
  subtitle: string;
}

const CustomSubtitle = (props: SubtitlePropsType) => {
  return (
    <div className="border-l-4  border-l-primary-400 rounded pl-2 flex items-center justify-between gap-2">
      <h3 className="text-lg font-semibold text-gray-100">{props.subtitle}</h3>
      {props.icon}
    </div>
  );
};

export default CustomSubtitle;
