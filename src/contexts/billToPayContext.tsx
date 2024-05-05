import { createContext, useState } from "react";

import { deleteData, getData, postData } from "../services/API";
import BillToPayType from "../types/billToPayType";

interface BillToPayContext {
  billToPayData?: BillToPayType[];
  updateData: () => void;
  createBillToPay: (body: BillToPayType) => Promise<any> | void;
  deleteBillToPay: (id: number) => any;
}

const initialState: BillToPayContext = {
  billToPayData: undefined,
  updateData: () => {},
  createBillToPay: () => {},
  deleteBillToPay: () => {},
};

const billToPayContext = createContext<BillToPayContext>(initialState);

const BillToPayContextProvider = ({ children }: any) => {
  const [billToPayData, setBillToPayData] = useState<BillToPayType[]>();

  async function getBillToPay() {
    try {
      const endpoint = "/bill";
      const { result } = await getData(endpoint);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateData() {
    try {
      const data = await getBillToPay();
      console.log(data);
      setBillToPayData(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function createBillToPay(body: BillToPayType) {
    try {
      const endpoint = "/bill";
      const result = await postData(endpoint, body);
      await updateData();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteBillToPay(id: number) {
    try {
      const endpoint = `/bill/${id}`;
      const result = await deleteData(endpoint);
      await updateData();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <billToPayContext.Provider
      value={{ updateData, billToPayData, createBillToPay, deleteBillToPay }}
    >
      {children}
    </billToPayContext.Provider>
  );
};

export { billToPayContext, BillToPayContextProvider };
