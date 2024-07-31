import { createContext, useState } from "react";

import { deleteData, getData, postData, putData } from "../services/API";
import BillToPayType from "../types/billToPayType";

interface BillToPayContext {
  billToPayData?: BillToPayType[];
  billResumeData?: any[];
  categoriesData?: any[];
  billType: string;
  toogleType: (type: string) => void;
  updateBills: (month: number, type: string) => void;
  createBillToPay: (body: BillToPayType, type: string) => Promise<any> | void;
  createCategory: (body: any, type: string) => Promise<any> | void;
  deleteBillToPay: (body: BillToPayType, type: string) => any;
  deleteCategory: (id: number, type: string) => any;
  updateBillToPayStatus: (id: number, type: string) => any;
  updateBillToPayData: (body: BillToPayType, type: string) => any;
}

const initialState: BillToPayContext = {
  billToPayData: undefined,
  billType: "extra",
  updateBills: () => {},
  toogleType: () => {},
  createBillToPay: () => {},
  createCategory: () => {},
  deleteBillToPay: () => {},
  deleteCategory: () => {},
  updateBillToPayData: () => {},
  updateBillToPayStatus: () => {},
};

const billToPayContext = createContext<BillToPayContext>(initialState);

const BillToPayContextProvider = ({ children }: any) => {
  const [billToPayData, setBillToPayData] = useState<BillToPayType[]>([]);
  const [billResumeData, setBillResumeData] = useState<any[]>([]);
  const [categoriesData, setCategoriesData] = useState<any[]>([]);
  const [billType, setBillType] = useState<string>("extra");

  function toogleType(type: string) {
    setBillType(type);
  }

  async function getCategories(type: string) {
    try {
      const endpoint = `/bill/${type}/category`;
      const { result } = await getData(endpoint);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function getBillToPay(month: number, type: string) {
    try {
      const endpoint = `/bill/${type}/${month}`;
      const { result } = await getData(endpoint);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateBills(month: number, type: string) {
    try {
      const { data, resume } = await getBillToPay(month, type);
      const categories = await getCategories(type);
      setCategoriesData(categories);
      setBillToPayData(data);
      setBillResumeData(resume);
    } catch (error) {
      console.log(error);
    }
  }

  async function createCategory(body: any, type: string) {
    try {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const endpoint = `/bill/${type}/category`;
      const result = await postData(endpoint, body);
      await updateBills(currentMonth, type);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function createBillToPay(body: BillToPayType, type: string) {
    try {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const endpoint = `/bill/${type}`;
      const result = await postData(endpoint, body);
      await updateBills(currentMonth, type);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteCategory(id: number, type: string) {
    try {
      const endpoint = `/bill/${type}/category/${id}`;
      const result = await deleteData(endpoint);
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      await updateBills(currentMonth, type);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteBillToPay(body: BillToPayType, type: string) {
    try {
      const endpoint = `/bill/${type}/${body.id}`;
      const result = await deleteData(endpoint);
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      await updateBills(currentMonth, type);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateBillToPayStatus(id: number, type: string) {
    try {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const endpoint = `/bill/${type}/pay/${id}`;
      const result = await putData(endpoint, {});
      await updateBills(currentMonth, type);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateBillToPayData(
    body: BillToPayType,
    type: string,
    billId?: number
  ) {
    try {
      const endpoint = `/bill/${type}/${body.id}`;
      const result = await putData(endpoint, body);

      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      await updateBills(currentMonth, type);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <billToPayContext.Provider
      value={{
        updateBills,
        billToPayData,
        createBillToPay,
        deleteBillToPay,
        updateBillToPayStatus,
        updateBillToPayData,
        billResumeData,
        categoriesData,
        billType,
        toogleType,
        createCategory,
        deleteCategory,
      }}
    >
      {children}
    </billToPayContext.Provider>
  );
};

export { billToPayContext, BillToPayContextProvider };
