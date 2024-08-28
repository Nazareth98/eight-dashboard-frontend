import PurchasesByMonth from "./purchasesByMonth";
import Resume from "./resume";
import PurchasesByGroup from "./purchasesByGroup";
import PurchasesByBrand from "./purchaseByBrand";

const ProviderDetails = () => {
  return (
    <>
      <Resume />
      <PurchasesByMonth />
      <PurchasesByGroup />
      <PurchasesByBrand />
    </>
  );
};

export default ProviderDetails;
