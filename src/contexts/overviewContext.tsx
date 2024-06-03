import { createContext, useState } from "react";
import { getData } from "../services/API";

interface MainValuesType {
  valueCash: number;
  balanceToPay: number;
  balanceToReceive: number;
  monthlySales: any[];
  monthlyPurchases: any[];
}

interface OverviewContext {
  mainValues?: MainValuesType;
  updateData: () => void;
}

const initialState: OverviewContext = {
  mainValues: undefined,
  updateData: () => {},
};

const overviewContext = createContext<OverviewContext>(initialState);

const OverviewContextProvider = ({ children }: any) => {
  const [mainValues, setMainValues] = useState<MainValuesType>();

  async function getMainValues() {
    try {
      const endpoint = "/data/main-values";
      const { result } = await getData(endpoint);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateData() {
    try {
      const mainValuesResult = await getMainValues();
      setMainValues(mainValuesResult);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <overviewContext.Provider value={{ updateData, mainValues }}>
      {children}
    </overviewContext.Provider>
  );
};

export { overviewContext, OverviewContextProvider };
