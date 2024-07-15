interface ChatCardType {
  onClick?: () => void;
  checked: boolean;
  name: string;
}

const ChatCard = (props: ChatCardType) => {
  return (
    <div
      onClick={props.onClick}
      className={`text-gray-300 w-full p-3 flex items-center gap-3 border-2 border-gray-800 rounded cursor-pointer transition hover:bg-gray-900 fade-left ${
        props.checked ? "border-primary-800 " : "border-gray-50"
      }`}
      {...props}
    >
      <div>
        <div
          className={`w-3 h-3 bg-gray-800 rounded ${
            props.checked && "bg-primary-400"
          }`}
        ></div>
      </div>
      <div>
        <p className="font-semibold text-lg">{props.name}</p>
      </div>
    </div>
  );
};

export default ChatCard;
