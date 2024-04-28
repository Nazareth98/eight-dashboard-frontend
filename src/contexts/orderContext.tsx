// Arquivo: AuthContextProvider.js
import { createContext, useState } from "react";

import { getData, postData } from "../services/API";
import OrderType from "../types/orderType";

interface OrderContext {
  orderData?: OrderType[];
  getOrders: () => void;
  refreshData: () => void;
  getOrderById: (id: number) => Promise<void> | Promise<OrderType>;
  shootingOrder: (id: number, shipping: number) => Promise<void>;
}

const initialState: OrderContext = {
  orderData: undefined,
  getOrders: () => {},
  refreshData: () => {},
  getOrderById: async () => {},
  shootingOrder: async () => {},
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
      const response = await getData(endpoint);
      if (response.status !== 200) {
        return response;
      }
      response.result.sort((a, b) => {
        return b.id - a.id;
      });
      console.log("aqui no refresh data", response.result);
      setOrderData(response.result);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const getOrderById = async (id: number) => {
    try {
      const endpoint = `/order/${id}`;
      const { result } = await getData(endpoint);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const shootingOrder = async (id: number, shipping: number) => {
    try {
      const body = {
        shipping: shipping > 0 ? shipping : null,
      };
      const endpoint = `/order/${id}`;
      const response = await postData(endpoint, body);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <orderContext.Provider
      value={{ orderData, getOrders, refreshData, getOrderById, shootingOrder }}
    >
      {children}
    </orderContext.Provider>
  );
};

export { orderContext, OrderContextProvider };
