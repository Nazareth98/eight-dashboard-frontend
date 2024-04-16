import { useContext, useEffect } from "react";
import ScreenContainer from "../../components/shared/screenContainer";
import ExchangerCreate from "../../components/exchangerCreate";
import { exchangerContext } from "../../contexts/exchangerContext";
import ExchangerList from "../../components/exchangerList";

const Exchangers = () => {
  const { updateData } = useContext(exchangerContext);

  useEffect(() => {
    const loadData = async () => {
      await updateData();
    };
    loadData();
  }, []);

  return (
    <ScreenContainer>
      <ExchangerCreate />
      <ExchangerList />
    </ScreenContainer>
  );
};

export default Exchangers;
