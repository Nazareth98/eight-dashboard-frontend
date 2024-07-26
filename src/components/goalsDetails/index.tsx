import { MousePointerClick } from "lucide-react";
import { Dispatch, useContext } from "react";
import { goalsContext } from "../../contexts/goalsContext";
import { ChargeType } from "../../types/chargeType";
import ComponentContainer from "../shared/componentContainer";
import Details from "./details";
import GoalsForm from "./goalsForm";

interface GoalsDetailsProps {
  setSelectedSheetsData: Dispatch<React.SetStateAction<any>>;
  selectedSheetsData: ChargeType;
  charges: ChargeType[];
}

const GoalsDetails = ({
  setSelectedSheetsData,
  selectedSheetsData,
  charges,
}: GoalsDetailsProps) => {
  const { searchData } = useContext(goalsContext);

  return (
    <ComponentContainer cols="3" classToAdd="row-span-12">
      {searchData ? (
        <>
          <GoalsForm
            charges={charges}
            data={searchData}
            setSelectedSheetsData={setSelectedSheetsData}
          />
          <div className="w-1/3 h-2 bg-gray-900 m-auto"></div>

          <Details selectedSheetsData={selectedSheetsData} />
        </>
      ) : (
        <div className="w-full h-full text-gray-500 font-heading flex items-center justify-center gap-2 fade-left">
          <MousePointerClick className="size-4" />
          <span>Selecione um cliente </span>
        </div>
      )}
    </ComponentContainer>
  );
};

export default GoalsDetails;
