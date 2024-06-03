import React, { useContext, useEffect } from "react";
import ScreenContainer from "../../components/shared/screenContainer";
import OverviewData from "../../components/overviewData";
import { overviewContext } from "../../contexts/overviewContext";
import OverviewMonthlySales from "../../components/overviewMonthlySales";
import OverviewMonthlyProfit from "../../components/overviewMonthlyProfit";
import OverviewMonthlyPurchases from "../../components/overviewMonthlyPurchases";

const Overview = () => {
  const { updateData } = useContext(overviewContext);

  useEffect(() => {
    async function lodaData() {
      await updateData();
    }

    lodaData();
  }, []);

  return (
    <ScreenContainer>
      <OverviewData />
      <OverviewMonthlySales />
      <OverviewMonthlyProfit />
      <OverviewMonthlyPurchases />

      <div className="col-span-12 row-span-6 bg-gray-900 p-6 rounded-xl border border-gray-800 flex flex-col gap-4">
        asdas
      </div>
    </ScreenContainer>
  );
};

export default Overview;
