import { createContext, useState } from "react";

import { getData } from "../services/API";
import CustomerType from "../types/customerType";
import { PaymentType } from "../types/paymentType";

interface GoalsContext {
  updateSearchData: (customertId: number, month: string, year: string) => void;
  setCurrentCustomer: (customer: CustomerType) => void;
  selectedCustomer: CustomerType;
  searchData: PaymentType[];
  cleanSearchData: () => void;
}

const initialState: GoalsContext = {
  updateSearchData: async () => {},
  setCurrentCustomer: async () => {},
  cleanSearchData: () => {},
  selectedCustomer: null,
  searchData: null,
};

const goalsContext = createContext<GoalsContext>(initialState);

const GoalsContextProvider = ({ children }: any) => {
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerType>();
  const [searchData, setSearchData] = useState();

  async function updateSearchData(
    customertId: number,
    month: string,
    year: string
  ) {
    try {
      const endpoint = `/data/monthly-payments/${customertId}?month=${month}&year=${year}`;
      const { result } = await getData(endpoint);
      setSearchData(result);
    } catch (error) {
      console.log(error);
    }
  }

  function cleanSearchData() {
    setSearchData(undefined);
  }

  function setCurrentCustomer(customer: CustomerType) {
    if (customer) setSelectedCustomer(customer);
  }

  return (
    <goalsContext.Provider
      value={{
        updateSearchData,
        setCurrentCustomer,
        cleanSearchData,
        selectedCustomer,
        searchData,
      }}
    >
      {children}
    </goalsContext.Provider>
  );
};

export { goalsContext, GoalsContextProvider };
