// Arquivo: AuthContextProvider.js
import { createContext, useState } from "react";

import { getData } from "../services/API";
import OrderType from "../types/orderType";

interface OrderContext {
  orderData?: OrderType[];
  getOrders: () => void;
  refreshData: () => void;
}

const initialState: OrderContext = {
  orderData: undefined,
  getOrders: () => {},
  refreshData: () => {},
};

const orderContext = createContext<OrderContext>(initialState);

const OrderContextProvider = ({ children }: any) => {
  const [orderData, setOrderData] = useState<OrderType[]>();

  const getOrders = async () => {
    try {
      const endpoint = "/order";
      const { result } = await getData(endpoint);
      result.sort((a, b) => {
        return b.id - a.id;
      });
      console.log("aqui", result);
      setOrderData(result);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshData = async () => {
    try {
      const endpoint = "/order/refresh-data";
      const { result } = await getData(endpoint);
      console.log("aqui no refresh data", result);
      setOrderData(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <orderContext.Provider value={{ orderData, getOrders, refreshData }}>
      {children}
    </orderContext.Provider>
  );
};

export { orderContext, OrderContextProvider };
