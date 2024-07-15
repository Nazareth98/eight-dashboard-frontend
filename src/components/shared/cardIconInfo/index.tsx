interface CardIconInfoType {
  data?: string;
  icon?: any;
  alternate?: boolean;
  label?: string;
}

const CardIconInfo = (props: CardIconInfoType) => {
  return (
    <div className="w-full text-gray-500 flex items-center gap-2">
      <div className="p-2 border-2 border-gray-700 rounded-lg">
        {props.icon}
      </div>
      <div className="flex-1">
        <p> {props.label}</p>
      </div>
      <div>
        <h4 className="text-gray-300 font-heading text-lg font-medium">
          {props.data ? props.data : "-"}
        </h4>
      </div>
    </div>
  );
};

export default CardIconInfo;
