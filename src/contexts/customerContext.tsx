import { createContext, useState } from "react";

import { getData } from "../services/API";
import CustomerType from "../types/customerType";

interface CustomerContext {
  customerData?: CustomerType[];
  updateCustomers: () => void;
  refreshData: () => void;
}

const initialState: CustomerContext = {
  customerData: undefined,
  updateCustomers: () => {},
  refreshData: () => {},
};

const customerContext = createContext<CustomerContext>(initialState);

const CustomerContextProvider = ({ children }: any) => {
  const [customerData, setCustomerData] = useState<CustomerType[]>();

  const updateCustomers = async () => {
    try {
      const endpoint = "/customer";
      const { result } = await getData(endpoint);
      setCustomerData(result);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshData = async () => {
    try {
      const endpoint = "/customer/refresh-data";
      const { result } = await getData(endpoint);
      setCustomerData(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <customerContext.Provider
      value={{ customerData, updateCustomers, refreshData }}
    >
      {children}
    </customerContext.Provider>
  );
};

export { customerContext, CustomerContextProvider };
