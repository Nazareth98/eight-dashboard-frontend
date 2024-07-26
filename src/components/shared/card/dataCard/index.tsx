import IconReport from "../../../../assets/svg/iconReport";
import ComponentContainer from "../../componentContainer";

const DataCard = (props) => {
  let bgColorClass = "";
  let iconColorClass = "";

  switch (props.type) {
    case "alternate":
      bgColorClass =
        "border-2 border-blue-300 hover:bg-blue-950 active:bg-blue-700";
      iconColorClass = "fill-blue-300";
      break;
    case "danger":
      bgColorClass =
        " border-2 border-red-500 hover:bg-red-950 hover:border-red-600 active:bg-red-900";
      iconColorClass = "fill-red-500";
      break;
    case "attention":
      bgColorClass =
        " border-2 border-yellow-300 hover:bg-yellow-950 hover:border-yellow-300 active:bg-yellow-900";
      iconColorClass = "fill-yellow-300";
      break;
    default:
      bgColorClass =
        "border-2 border-primary-400 hover:bg-primary-950 hover:border-primary-300 active:bg-primary-900";
      iconColorClass = "fill-primary-300";
      break;
  }

  return (
    <ComponentContainer
      cols="3"
      rows="2"
      onClick={props.onClick}
      classToAdd="row-span-2 cursor-pointer transition-all hover:bg-gray-900 active:bg-gray-950"
    >
      <div className="w-full h-full flex items-center gap-4">
        <div className={`p-3 rounded-full transition ${bgColorClass}`}>
          {props.icon ? (
            props.icon
          ) : (
            <IconReport width="30px" fill={`${iconColorClass}`} />
          )}
        </div>
        <div>
          <span className="text-gray-400 font-medium">{props.name}</span>
          <h3 className="text-2xl text-gray-50 font-semibold font-heading fade-left">
            {props.value}
          </h3>
        </div>
      </div>
    </ComponentContainer>
  );
};

export default DataCard;
