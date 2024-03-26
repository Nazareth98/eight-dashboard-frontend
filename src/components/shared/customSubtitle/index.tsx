interface SubtitlePropsType {
  icon: JSX.Element;
  subtitle: string;
}

const CustomSubtitle = (props: SubtitlePropsType) => {
  return (
    <div className="flex items-center gap-2">
      {props.icon}
      <h3 className="text-lg font-medium text-gray-100">{props.subtitle}</h3>
    </div>
  );
};

export default CustomSubtitle;
