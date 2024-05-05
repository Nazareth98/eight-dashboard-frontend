import React, { useContext, useEffect } from "react";
import ScreenContainer from "../../components/shared/screenContainer";
import BillToPayCreate from "../../components/billToPayCreate";
import BillsToPayList from "../../components/billToPayList";
import { billToPayContext } from "../../contexts/billToPayContext";
import BillToPayInfo from "../../components/billToPayInfo";

const BillsToPay = () => {
  const { updateData } = useContext(billToPayContext);

  useEffect(() => {
    function loadData() {
      updateData();
    }
    loadData();
  }, []);

  return (
    <ScreenContainer>
      <BillToPayInfo />
      <BillsToPayList />
      <BillToPayCreate />
    </ScreenContainer>
  );
};

export default BillsToPay;
