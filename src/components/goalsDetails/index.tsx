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
}

const GoalsDetails = ({
  setSelectedSheetsData,
  selectedSheetsData,
}: GoalsDetailsProps) => {
  const { searchData, charges } = useContext(goalsContext);

  return (
    <ComponentContainer cols="3" classToAdd="row-span-12">
      {searchData && (
        <>
          <GoalsForm
            charges={charges}
            data={searchData}
            setSelectedSheetsData={setSelectedSheetsData}
          />
          <div className="w-1/3 h-2 bg-gray-900 m-auto"></div>

          <Details selectedSheetsData={selectedSheetsData} />
        </>
      )}
    </ComponentContainer>
  );
};

export default GoalsDetails;
