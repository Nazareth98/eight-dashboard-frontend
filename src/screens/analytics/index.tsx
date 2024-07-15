import { useContext, useEffect } from "react";
import ScreenContainer from "../../components/shared/screenContainer";
import AnalyticsForm from "../../components/analyticsForm";
import { customerContext } from "../../contexts/customerContext";
import AnalyticsRankingList from "../../components/analyticsRankingList";
import { analyticsContext } from "../../contexts/analyticsContext";

const Analytics = () => {
  const { getCustomers } = useContext(customerContext);
  const { updateData } = useContext(analyticsContext);

  useEffect(() => {
    async function loadData() {
      await getCustomers();
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
