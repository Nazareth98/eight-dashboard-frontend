import { useState } from "react";
import ScreenContainer from "../../components/shared/screenContainer";
import SugesttionForm from "../../components/suggestionForm";
import SuggestionList from "../../components/suggestionList";
import SuggestionCbm from "../../components/suggestionCbm";

export interface SuggestionDataType {
  id: number;
  name: string;
  groupName: string;
  total: number;
  suggestion: number;
}

const PurchaseSuggestion = () => {
  const [suggestionData, setSuggestionData] = useState<SuggestionDataType[]>();

  return (
    <ScreenContainer>
      <SugesttionForm setSuggestionData={setSuggestionData} />
      <SuggestionList data={suggestionData} />
      <SuggestionCbm />
    </ScreenContainer>
  );
};

export default PurchaseSuggestion;
