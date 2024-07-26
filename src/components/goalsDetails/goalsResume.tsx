import { MousePointerClick } from "lucide-react";
import ComponentContainer from "../shared/componentContainer";

const GoalsResume = () => {
  return (
    <ComponentContainer classToAdd="row-span-12 col-span-3">
      <div className="h-full text-gray-600 font-heading flex items-center justify-center gap-2">
        <MousePointerClick className="size-5" />
        <span>Selecione um cliente</span>
      </div>
    </ComponentContainer>
  );
};

export default GoalsResume;
