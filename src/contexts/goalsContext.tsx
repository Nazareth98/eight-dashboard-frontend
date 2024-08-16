import { createContext, useState } from "react";

import { getData, patchData } from "../services/API";
import CustomerType from "../types/customerType";
import { PaymentType } from "../types/paymentType";
import { ChargeType } from "../types/chargeType";

interface GoalsContext {
  updateSearchData: (customertId: number, month: string, year: string) => void;
  setCurrentCustomer: (customer: CustomerType) => void;
  updateCharges: () => Promise<void>;
  selectedCustomer: CustomerType;
  charges: ChargeType[];
  searchData: PaymentType[];
  cleanSearchData: () => void;
  updateGoal: (goal: number, id: number) => void;
}

const initialState: GoalsContext = {
  updateSearchData: async () => {},
  setCurrentCustomer: async () => {},
  updateCharges: async () => {},
  updateGoal: async () => {},
  cleanSearchData: () => {},
  selectedCustomer: null,
  searchData: null,
  charges: null,
};

const goalsContext = createContext<GoalsContext>(initialState);

const GoalsContextProvider = ({ children }: any) => {
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerType>();
  const [searchData, setSearchData] = useState();
  const [charges, setCharges] = useState();

  async function updateSearchData(
    customertId: number,
    month: string,
    year: string
  ) {
    try {
      const endpoint = `/customer/payments/${customertId}?month=${month}&year=${year}`;
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

  async function updateGoal(goal: number, id: number) {
    try {
      const endpoint = `/customer/goal/${id}`;
      const result = await patchData(endpoint, { goal });
      alert(result.message);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function updateCharges() {
    try {
      setCharges(undefined);
      const endpoint = `/sheets/charges`;
      const { result } = await getData(endpoint);
      setCharges(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <goalsContext.Provider
      value={{
        updateSearchData,
        setCurrentCustomer,
        cleanSearchData,
        updateGoal,
        updateCharges,
        selectedCustomer,
        searchData,
        charges,
      }}
    >
      {children}
    </goalsContext.Provider>
  );
};

export { goalsContext, GoalsContextProvider };
