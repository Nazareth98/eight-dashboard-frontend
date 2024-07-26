interface CardIconInfoType {
  data?: string;
  icon?: any;
  alternate?: boolean;
  label?: string;
  theme?: string;
}

const CardIconInfo = (props: CardIconInfoType) => {
  let themeColor = "";

  switch (props.theme) {
    case "red":
      themeColor = "bg-red-950 border-red-700 text-red-500";
      break;
    case "blue":
      themeColor = "bg-blue-950 border-blue-700 text-blue-500";
      break;
    case "green":
      themeColor = "bg-green-950 border-green-700 text-green-500";
      break;
    case "yellow":
      themeColor = "bg-yellow-950 border-yellow-700 text-yellow-500";
      break;
    case "orange":
      themeColor = "bg-orange-950 border-orange-700 text-orange-500";
      break;

    default:
      themeColor = "bg-gray-950 border-gray-700 text-gray-500";
      break;
  }

  return (
    <div className="w-full  flex items-center gap-2">
      <div className={`p-2 border-2 rounded-lg ${themeColor}`}>
        {props.icon}
      </div>
      <div className="flex-1 text-gray-400">
        <p> {props.label}</p>
      </div>
      <div>
        <h4 className={`text-gray-200 font-heading text-xl font-medium`}>
          {props.data ? props.data : "-"}
        </h4>
      </div>
    </div>
  );
};

export default CardIconInfo;
