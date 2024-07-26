import { createContext, useState } from "react";
import { getData } from "../services/API";
import { ProviderType } from "../types/providerType";

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
  getValuesCash: () => void;
  getProviders: () => Promise<ProviderType[]>;
  getDebtors: () => void;
  getDailyProfit: (month: number, year: number) => void;
  getDailySales: (month: number, year: number) => void;
  getDailyPurchases: (month: number, year: number) => void;
}

const initialState: OverviewContext = {
  mainValues: undefined,
  updateData: () => {},
  getValuesCash: () => {},
  getProviders: async () => [],
  getDebtors: () => {},
  getDailyProfit: () => {},
  getDailySales: () => {},
  getDailyPurchases: () => {},
};

const overviewContext = createContext<OverviewContext>(initialState);

const OverviewContextProvider = ({ children }: any) => {
  const [mainValues, setMainValues] = useState<MainValuesType>();

  async function getMainValues() {
    try {
      const endpoint = "/data/main-values";
      const { result } = await getData(endpoint);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function getValuesCash() {
    try {
      const endpoint = "/data/cash-values";
      const { result } = await getData(endpoint);
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

  async function getProviders(): Promise<ProviderType[]> {
    try {
      const endpoint = "/data/providers";
      const { result } = await getData(endpoint);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function getDebtors() {
    try {
      const endpoint = "/data/debtors";
      const { result } = await getData(endpoint);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function getDailyProfit(month, year) {
    try {
      const endpoint = `/data/daily-profit?month=${month}&year=${year}`;
      const { result } = await getData(endpoint);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function getDailySales(month, year) {
    try {
      const endpoint = `/data/daily-sales?month=${month}&year=${year}`;
      const { result } = await getData(endpoint);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function getDailyPurchases(month, year) {
    try {
      const endpoint = `/data/daily-purchases?month=${month}&year=${year}`;
      const { result } = await getData(endpoint);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <overviewContext.Provider
      value={{
        updateData,
        mainValues,
        getValuesCash,
        getProviders,
        getDebtors,
        getDailyProfit,
        getDailySales,
        getDailyPurchases,
      }}
    >
      {children}
    </overviewContext.Provider>
  );
};

export { overviewContext, OverviewContextProvider };
