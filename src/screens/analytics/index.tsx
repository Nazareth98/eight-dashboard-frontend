import { useContext, useEffect } from "react";
import AnalyticsForm from "../../components/analyticsForm";
import AnalyticsRankingList from "../../components/analyticsRankingList";
import ScreenContainer from "../../components/shared/screenContainer";
import { analyticsContext } from "../../contexts/analyticsContext";
import { customerContext } from "../../contexts/customerContext";

const Analytics = () => {
  const { updateCustomers } = useContext(customerContext);
  const { updateData } = useContext(analyticsContext);

  useEffect(() => {
    async function loadData() {
      await updateCustomers();
      await updateData();
    }
    loadData();
  }, []);

  return (
    <ScreenContainer>
      <AnalyticsForm />
      <AnalyticsRankingList />
    </ScreenContainer>
  );
};

export default Analytics;
