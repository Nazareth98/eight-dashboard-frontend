import React, { useState } from "react";
import ComponentContainer from "../shared/componentContainer";
import CustomSubtitle from "../shared/customSubtitle";
import { SuggestionDataType } from "../../screens/purchaseSuggestion";

interface SuggestionResumeProps {
  data: SuggestionDataType[];
}

const SuggestionResume = ({ data }: SuggestionResumeProps) => {
  return (
    <ComponentContainer classToAdd="row-span-7 col-span-3">
      <div></div>
    </ComponentContainer>
  );
};

export default SuggestionResume;
