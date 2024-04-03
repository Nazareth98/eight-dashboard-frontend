// Arquivo: AuthContextProvider.js
import { createContext, useState } from "react";

import { getData } from "../services/API";
import CustomerType from "../types/customerType";

interface CustomerContext {
  customerData?: CustomerType[];
  getCustomers: () => void;
  refreshData: () => void;
}

const initialState: CustomerContext = {
  customerData: undefined,
  getCustomers: () => {},
  refreshData: () => {},
};

const customerContext = createContext<CustomerContext>(initialState);

const CustomerContextProvider = ({ children }: any) => {
  const [customerData, setCustomerData] = useState<CustomerType[]>();

  const getCustomers = async () => {
    try {
      const endpoint = "/customer";
      const { result } = await getData(endpoint);
      console.log("aqui", result);
      setCustomerData(result);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshData = async () => {
    try {
      const endpoint = "/customer/refresh-data";
      const { result } = await getData(endpoint);
      console.log("aqui no refresh data", result);
      setCustomerData(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <customerContext.Provider
      value={{ customerData, getCustomers, refreshData }}
    >
      {children}
    </customerContext.Provider>
  );
};

export { customerContext, CustomerContextProvider };
