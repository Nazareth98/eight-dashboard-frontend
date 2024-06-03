import { createContext, useState } from "react";

import { deleteData, getData, postData, putData } from "../services/API";
import BillToPayType from "../types/billToPayType";

interface BillToPayContext {
  billToPayData?: BillToPayType[];
  updateData: (month: number) => void;
  createBillToPay: (body: BillToPayType) => Promise<any> | void;
  deleteBillToPay: (id: number) => any;
  updateBillToPayStatus: (id: number) => any;
  updateBillToPayData: (body: BillToPayType) => any;
}

const initialState: BillToPayContext = {
  billToPayData: undefined,
  updateData: () => {},
  createBillToPay: () => {},
  deleteBillToPay: () => {},
  updateBillToPayData: () => {},
  updateBillToPayStatus: () => {},
};

const billToPayContext = createContext<BillToPayContext>(initialState);

const BillToPayContextProvider = ({ children }: any) => {
  const [billToPayData, setBillToPayData] = useState<BillToPayType[]>();

  async function getBillToPay(month: number) {
    try {
      const endpoint = `/bill/${month}`;
      const { result } = await getData(endpoint);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateData(month: number) {
    try {
      const data = await getBillToPay(month);
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

  async function updateBillToPayStatus(id: number) {
    try {
      const endpoint = `/bill/pay/${id}`;
      const result = await putData(endpoint, {});
      await updateData();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateBillToPayData(body: BillToPayType) {
    try {
      const id = body.id;
      const endpoint = `/bill/${id}`;
      const result = await putData(endpoint, body);
      await updateData();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <billToPayContext.Provider
      value={{
        updateData,
        billToPayData,
        createBillToPay,
        deleteBillToPay,
        updateBillToPayStatus,
        updateBillToPayData,
      }}
    >
      {children}
    </billToPayContext.Provider>
  );
};

export { billToPayContext, BillToPayContextProvider };
