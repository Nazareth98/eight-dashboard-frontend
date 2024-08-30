import { useState } from "react";
import ScreenContainer from "../../components/shared/screenContainer";
import SugesttionForm from "../../components/suggestionForm";
import SuggestionList from "../../components/suggestionList";
import SuggestionResume from "../../components/suggestionResume";

export interface SuggestionDataType {
  product: number;
  description: string;
  classification: string;
  groupDescription: string;
  brand: number;
  brandName: string;
  dailySalesAverage: number;
  currentStock: number;
  safetyStock: number;
  purchaseSuggestion: number;
}

const PurchaseSuggestion = () => {
  const [suggestionData, setSuggestionData] = useState<SuggestionDataType[]>();

  return (
    <ScreenContainer>
      <SugesttionForm setSuggestionData={setSuggestionData} />
      <SuggestionList data={suggestionData} />
      <SuggestionResume data={suggestionData} />
    </ScreenContainer>
  );
};

export default PurchaseSuggestion;
