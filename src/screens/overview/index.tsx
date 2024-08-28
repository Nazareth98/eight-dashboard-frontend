import { useContext, useEffect } from "react";
import ScreenContainer from "../../components/shared/screenContainer";
import OverviewData from "../../components/overviewData";
import { overviewContext } from "../../contexts/overviewContext";
import OverviewMonthlySales from "../../components/overviewMonthlySales";
import OverviewMonthlyProfit from "../../components/overviewMonthlyProfit";
import OverviewMonthlyPurchases from "../../components/overviewMonthlyPurchases";
import AnnualComparison from "../../components/annualComparison";

const Overview = ({ changeScreen }) => {
  const { updateOverviewData } = useContext(overviewContext);

  useEffect(() => {
    async function lodaData() {
      await updateOverviewData();
    }

    lodaData();
  }, []);

  // TODO: Continuar construindo gráficos de comparativo anual

  return (
    <ScreenContainer>
      <OverviewData changeScreen={changeScreen} />
      <OverviewMonthlySales />
      <OverviewMonthlyProfit />
      <OverviewMonthlyPurchases />
      <AnnualComparison />
    </ScreenContainer>
  );
};

export default Overview;
