import { createContext, useState } from "react";

import { deleteData, getData, postData } from "../services/API";
import UserType from "../types/userType";
import ExchangerType from "../types/exchangerType";

interface ExchangerContext {
  exchangerData?: ExchangerType[];
  updateData: () => void;
  createExchanger: (body: ExchangerType) => Promise<any> | void;
  deleteExchanger: (id: number) => any;
}

const initialState: ExchangerContext = {
  exchangerData: undefined,
  updateData: () => {},
  createExchanger: () => {},
  deleteExchanger: () => {},
};

const exchangerContext = createContext<ExchangerContext>(initialState);

const ExchangerContextProvider = ({ children }: any) => {
  const [exchangerData, setExchangerData] = useState<ExchangerType[]>();

  async function getExchangers() {
    try {
      const endpoint = "/exchanger";
      const { result } = await getData(endpoint);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateData() {
    try {
      const data = await getExchangers();
      setExchangerData(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function createExchanger(body: ExchangerType) {
    try {
      const endpoint = "/exchanger";
      const result = await postData(endpoint, body);
      await updateData();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteExchanger(id: number) {
    try {
      const endpoint = `/exchanger/${id}`;
      const result = await deleteData(endpoint);
      await updateData();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <exchangerContext.Provider
      value={{ updateData, exchangerData, createExchanger, deleteExchanger }}
    >
      {children}
    </exchangerContext.Provider>
  );
};

export { exchangerContext, ExchangerContextProvider };
