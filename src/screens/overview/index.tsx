import React, { useContext, useEffect } from "react";
import ScreenContainer from "../../components/shared/screenContainer";
import OverviewData from "../../components/overviewData";
import { overviewContext } from "../../contexts/overviewContext";
import OverviewMonthlySales from "../../components/overviewMonthlySales";
import OverviewMonthlyProfit from "../../components/overviewMonthlyProfit";
import OverviewMonthlyPurchases from "../../components/overviewMonthlyPurchases";

const Overview = ({ changeScreen }) => {
  const { updateData } = useContext(overviewContext);

  useEffect(() => {
    async function lodaData() {
      await updateData();
    }

    lodaData();
  }, []);

  return (
    <ScreenContainer>
      <OverviewData changeScreen={changeScreen} />
      <OverviewMonthlySales />
      <OverviewMonthlyProfit />
      <OverviewMonthlyPurchases />
    </ScreenContainer>
  );
};

export default Overview;
