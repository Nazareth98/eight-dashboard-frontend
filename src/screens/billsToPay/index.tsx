import React, { useContext, useEffect } from "react";
import ScreenContainer from "../../components/shared/screenContainer";
import BillToPayCreate from "../../components/billToPayCreate";
import BillsToPayList from "../../components/billToPayList";
import { billToPayContext } from "../../contexts/billToPayContext";
import BillToPayInfo from "../../components/billToPayInfo";
import { getLastSixMonths } from "../../utils/generalsUtils";

const BillsToPay = () => {
  const { updateData } = useContext(billToPayContext);

  useEffect(() => {
    function loadData() {
      // const lastSixMonths = getLastSixMonths();
      // const currentMonth = lastSixMonths[5];
      // console.log(currentMonth);
      // updateData(currentMonth.number);
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
