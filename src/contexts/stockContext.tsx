import { createContext, useState } from "react";

import { getData } from "../services/API";

interface StockContext {
  stockData?: any[];
  updateStock: () => void;
}

const initialState: StockContext = {
  stockData: undefined,
  updateStock: () => {},
};

const stockContext = createContext<StockContext>(initialState);

const StockContextProvider = ({ children }: any) => {
  const [stockData, setStockData] = useState<any[]>();

  async function getStock() {
    try {
      const endpoint = "/stock";
      const { result } = await getData(endpoint);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateStock() {
    try {
      const data = await getStock();
      setStockData(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <stockContext.Provider value={{ updateStock, stockData }}>
      {children}
    </stockContext.Provider>
  );
};

export { stockContext, StockContextProvider };
