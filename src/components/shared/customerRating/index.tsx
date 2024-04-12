import React from "react";

const CustomerRating = ({ rating }) => {
  let bgColor = "bg-primary-500";

  switch (rating) {
    case "A": {
      bgColor = "bg-primary-500";
      break;
    }
    case "B": {
      bgColor = "bg-blue-500";
      break;
    }
    case "C": {
      bgColor = "bg-yellow-500";
      break;
    }
    case "D": {
      bgColor = "bg-orange-500";
      break;
    }
    case "E": {
      bgColor = "bg-red-600";
      break;
    }
    case "F": {
      bgColor = "bg-red-900";
      break;
    }
    default:
      bgColor = "bg-primary-500";
  }

  return (
    <div
      className={`w-6 h-6 text-gray-50 ${bgColor} rounded flex items-center justify-center`}
    >
      <p className="text-sx font-semibold">{rating}</p>
    </div>
  );
};

export default CustomerRating;
