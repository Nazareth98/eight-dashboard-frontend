import { useState } from "react";
import PurchaseByProducts from "./purchaseByProducts";
import PurchasesByMonth from "./purchasesByMonth";
import PurchasesDetails from "./purchasesDetails";
import Resume from "./resume";

const ProviderDetails = () => {
  const [selectWeek, setSelectMonth] = useState();

  return (
    <>
      <Resume setSelectMonth={setSelectMonth} />
      <PurchasesByMonth setSelectMonth={setSelectMonth} />
      {/* <PurchasesDetails data={selectWeek} /> */}
      {/* <PurchaseByProducts /> */}
    </>
  );
};

export default ProviderDetails;
