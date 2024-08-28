import AllOrders from "./allOrders";
import ChartByBrand from "./chartByBrand";
import ChartByGroup from "./chartByGroup";
import Resume from "./resume";

const AnalyticsDetails = () => {
  return (
    <>
      <Resume />
      <ChartByBrand />
      <AllOrders />
      <ChartByGroup />
    </>
  );
};

export default AnalyticsDetails;
