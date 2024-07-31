import { useContext, useEffect, useState } from "react";
import ScreenContainer from "../../components/shared/screenContainer";
import { stockContext } from "../../contexts/stockContext";
import StockList from "../../components/stockList";
import StockByDeposit from "../../components/stockByDeposit";
import StockByGroup from "../../components/stockByGroup";

const Stock = () => {
  const { updateStock } = useContext(stockContext);

  const [selectGroup, setSelectGroup] = useState();
  const [selectDeposit, setSelectDeposit] = useState();

  useEffect(() => {
    const loadData = async () => {
      await updateStock();
    };
    loadData();
  }, []);

  return (
    <ScreenContainer>
      <StockByGroup
        setSelectGroup={setSelectGroup}
        setSelectDeposit={setSelectDeposit}
      />
      <StockList selectGroup={selectGroup} selectDeposit={selectDeposit} />
      <StockByDeposit
        selectGroup={selectGroup}
        setSelectDeposit={setSelectDeposit}
      />
    </ScreenContainer>
  );
};

export default Stock;
