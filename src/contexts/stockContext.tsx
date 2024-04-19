import { createContext, useState } from "react";

import { getData } from "../services/API";
import ExchangerType from "../types/exchangerType";

interface StockContext {
  stockData?: ExchangerType[];
  updateData: () => void;
}

const initialState: StockContext = {
  stockData: undefined,
  updateData: () => {},
};

const stockContext = createContext<StockContext>(initialState);

const StockContextProvider = ({ children }: any) => {
  const [stockData, setStockData] = useState<any[]>();

  async function getExchangers() {
    try {
      const endpoint = "/stock";
      const { result } = await getData(endpoint);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateData() {
    try {
      const data = await getExchangers();
      setStockData(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <stockContext.Provider value={{ updateData, stockData }}>
      {children}
    </stockContext.Provider>
  );
};

export { stockContext, StockContextProvider };
