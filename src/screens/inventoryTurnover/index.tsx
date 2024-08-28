import ScreenContainer from "../../components/shared/screenContainer";
import { useContext, useEffect } from "react";
import { inventoryTurnoverContext } from "../../contexts/InventoryTurnoverContext";
import TurnoverByProduct from "../../components/turnoverByProduct";
import TurnoverByGroup from "../../components/turnoverByGroup";
import TurnoverByBrand from "../../components/turnoverByBrand";
import TurnoverInfo from "../../components/turnoverInfo";

const InventoryTurnover = () => {
  const { updateData } = useContext(inventoryTurnoverContext);

  useEffect(() => {
    updateData();
  }, []);

  return (
    <ScreenContainer>
      <TurnoverByProduct />
      <TurnoverInfo />
      <TurnoverByGroup />
      <TurnoverByBrand />
    </ScreenContainer>
  );
};

export default InventoryTurnover;
