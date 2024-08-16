import { createContext, useState } from "react";

import { getData } from "../services/API";

interface AnalyticsContext {
  analyticsData?: any[];
  updateData: () => void;
  getAnalyticsById: (id: number, period: number) => Promise<any> | void;
}

const initialState: AnalyticsContext = {
  analyticsData: undefined,
  updateData: () => {},
  getAnalyticsById: () => {},
};

const analyticsContext = createContext<AnalyticsContext>(initialState);

const AnalyticsContextProvider = ({ children }: any) => {
  const [analyticsData, setAnalyticsData] = useState<any[]>();

  async function getAnalytics() {
    try {
      const endpoint = "/customer/analytics";
      const { result } = await getData(endpoint);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateData() {
    try {
      const data = await getAnalytics();
      setAnalyticsData(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAnalyticsById(id: number, period: number) {
    try {
      const endpoint = `/customer/analytics/${id}?period=${period}`;
      const result = await getData(endpoint);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <analyticsContext.Provider
      value={{ updateData, analyticsData, getAnalyticsById }}
    >
      {children}
    </analyticsContext.Provider>
  );
};

export { analyticsContext, AnalyticsContextProvider };
