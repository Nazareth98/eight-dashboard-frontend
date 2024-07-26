import { createContext } from "react";

import { getData } from "../services/API";
import { ChargeType } from "../types/chargeType";

interface SheetsContext {
  getCharges: () => Promise<ChargeType[]>;
}

const initialState: SheetsContext = {
  getCharges: async () => [],
};

const sheetsContext = createContext<SheetsContext>(initialState);

const SheetsContextProvider = ({ children }: any) => {
  async function getCharges() {
    try {
      const endpoint = `/sheets/charges`;
      const { result } = await getData(endpoint);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <sheetsContext.Provider
      value={{
        getCharges,
      }}
    >
      {children}
    </sheetsContext.Provider>
  );
};

export { sheetsContext, SheetsContextProvider };
