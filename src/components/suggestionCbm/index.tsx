import { ArrowLeftCircle, Calculator } from "lucide-react";
import { useState } from "react";
import ComponentContainer from "../shared/componentContainer";
import CustomButton from "../shared/customButton";
import CustomSubtitle from "../shared/customSubtitle";
import CbmForm from "./cbmForm";
import CbmResult from "./cbmResult";

const SuggestionCbm = () => {
  const [cbmData, setCbmData] = useState();

  function cleanData() {
    setCbmData(undefined);
  }

  return (
    <ComponentContainer classToAdd="row-span-7 col-span-4 relative">
      <CustomSubtitle
        subtitle="Calculo CBM"
        icon={<Calculator className="size-6" />}
      />
      {cbmData ? (
        <>
          <div className="absolute right-6 fade-right">
            <CustomButton theme="attention" onClick={cleanData}>
              <ArrowLeftCircle className="size-4" />
              voltar tela
            </CustomButton>
          </div>
          <CbmResult cbmData={cbmData} />
        </>
      ) : (
        <CbmForm setCbmData={setCbmData} />
      )}
    </ComponentContainer>
  );
};

export default SuggestionCbm;
