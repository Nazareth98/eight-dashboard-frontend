import { useContext, useEffect } from "react";
import AnalyticsForm from "../../components/analyticsForm";
import AnalyticsRankingList from "../../components/analyticsRankingList";
import ScreenContainer from "../../components/shared/screenContainer";
import { analyticsContext } from "../../contexts/analyticsContext";
import { customerContext } from "../../contexts/customerContext";
import AnalyticsDetails from "../../components/analyticsDetails";
import AnalyticsAbcAnalysis from "../../components/analyticsAbcAnalysis";

const Analytics = () => {
  const { updateCustomers } = useContext(customerContext);
  const { updateData, currentCustomer } = useContext(analyticsContext);

  useEffect(() => {
    async function loadData() {
      await updateCustomers();
      await updateData();
    }
    loadData();
  }, []);

  return (
    <ScreenContainer>
      {currentCustomer ? (
        <AnalyticsDetails />
      ) : (
        <>
          <AnalyticsRankingList />
          <AnalyticsAbcAnalysis />
          <AnalyticsForm />
        </>
      )}
    </ScreenContainer>
  );
};

export default Analytics;
