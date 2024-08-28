import { createContext, useState } from "react";

import { getData } from "../services/API";

interface CustomerAnalyticsType {
  customerId: number;
  customerName: string;
  totalOrders: number;
  amountPaid: number;
  amountProfit: number;
  amountPurchased: number;
  delayAverage: number;
}

interface AbcDataType {
  totalSaleValue: number;
  totalPurchasedValue: number;
  abcPercentage: number;
  abcNote: string;
}

export interface AbcAnalysisType extends CustomerAnalyticsType {
  abcAnalysis: AbcDataType;
}

interface AnalyticsContext {
  analyticsData?: CustomerAnalyticsType[];
  abcAnalysisData?: AbcAnalysisType[];
  currentCustomer: CustomerAnalyticsType;
  customerDetails: any[];
  updateData: () => void;
  selectCustomer: (customer: any) => void;
  getAnalyticsById: (id: number) => Promise<any> | void;
}

const initialState: AnalyticsContext = {
  analyticsData: undefined,
  abcAnalysisData: undefined,
  currentCustomer: undefined,
  customerDetails: undefined,
  updateData: () => {},
  selectCustomer: () => {},
  getAnalyticsById: () => {},
};

const analyticsContext = createContext<AnalyticsContext>(initialState);

const AnalyticsContextProvider = ({ children }: any) => {
  const [analyticsData, setAnalyticsData] = useState<CustomerAnalyticsType[]>();
  const [abcAnalysisData, setAbcAnalysisData] = useState<AbcAnalysisType[]>();
  const [currentCustomer, setCurrentCustomer] =
    useState<CustomerAnalyticsType>();
  const [customerDetails, setCustomerDetails] = useState();

  async function getAbcAnalysisType() {
    try {
      const endpoint = "/customer/abc-analysis";
      const { result } = await getData(endpoint);
      setAbcAnalysisData(result);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAnalytics() {
    try {
      const endpoint = "/customer/analytics";
      const { result } = await getData(endpoint);
      result.sort((a, b) => b.amountPaid - a.amountPaid);
      setAnalyticsData(result);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateData() {
    try {
      await getAnalytics();
      await getAbcAnalysisType();
    } catch (error) {
      console.log(error);
    }
  }

  async function getAnalyticsById(id: number) {
    try {
      const endpoint = `/customer/analytics/${id}`;
      const { result } = await getData(endpoint);
      setCustomerDetails(result);
    } catch (error) {
      console.log(error);
    }
  }

  function selectCustomer(customer) {
    setCurrentCustomer(customer);
  }

  return (
    <analyticsContext.Provider
      value={{
        updateData,
        getAnalyticsById,
        selectCustomer,
        analyticsData,
        currentCustomer,
        customerDetails,
        abcAnalysisData,
      }}
    >
      {children}
    </analyticsContext.Provider>
  );
};

export { analyticsContext, AnalyticsContextProvider };
