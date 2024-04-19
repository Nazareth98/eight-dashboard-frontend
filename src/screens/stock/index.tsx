import { useContext, useEffect } from "react";
import ScreenContainer from "../../components/shared/screenContainer";
import { stockContext } from "../../contexts/stockContext";
import StockList from "../../components/stockList";

const Stock = () => {
  const { updateData } = useContext(stockContext);

  useEffect(() => {
    const loadData = async () => {
      await updateData();
    };
    loadData();
  }, []);

  return (
    <ScreenContainer>
      <StockList />
    </ScreenContainer>
  );
};

export default Stock;
