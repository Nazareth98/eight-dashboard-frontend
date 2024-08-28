import { Flag, FlagTriangleLeft, FlagTriangleRight } from "lucide-react";
import React from "react";

const FeatureFlag = () => {
  return (
    <div className="bg-yellow-950 p-2 rounded-lg border-2 border-yellow-800 text-yellow-600 font-heading flex items-center gap-2">
      <FlagTriangleRight className="size-5" />
      <p className="text-sm">Funcionalidade em desenvolvimento</p>
    </div>
  );
};

export default FeatureFlag;
