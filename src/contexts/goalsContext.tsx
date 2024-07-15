import { createContext } from "react";

import { getData } from "../services/API";

interface GoalsContext {
  getMonthlyPayments: (
    customertId: number,
    month: string,
    year: string
  ) => Promise<any[]>;
}

const initialState: GoalsContext = {
  getMonthlyPayments: async () => [],
};

const goalsContext = createContext<GoalsContext>(initialState);

const GoalsContextProvider = ({ children }: any) => {
  async function getMonthlyPayments(customerId, month, year) {
    try {
      const endpoint = `/data/monthly-Payments/${customerId}?month=${month}&year=${year}`;
      const { result } = await getData(endpoint);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <goalsContext.Provider
      value={{
        getMonthlyPayments,
      }}
    >
      {children}
    </goalsContext.Provider>
  );
};

export { goalsContext, GoalsContextProvider };
