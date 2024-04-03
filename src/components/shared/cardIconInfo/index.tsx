import React from "react";

interface CardIconInfoType {
  data?: string;
  icon?: any;
  alternate?: boolean;
  label?: string;
}

const CardIconInfo = (props: CardIconInfoType) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`bg-primary-950 p-2 rounded-xl border-2 ${
          props.alternate ? "border-primary-800" : "border-primary-400"
        } `}
      >
        {props.icon}
      </div>
      <div className="flex flex-col">
        {props.label && (
          <label className="text-sm text-gray-200 font-medium" htmlFor="">
            {props.label}
          </label>
        )}
        <span
          className={`font-heading text-lg font-medium ${
            props.alternate ? "text-gray-500" : "text-gray-50"
          }`}
        >
          {props.data ? props.data : "-"}
        </span>
      </div>
    </div>
  );
};

export default CardIconInfo;
