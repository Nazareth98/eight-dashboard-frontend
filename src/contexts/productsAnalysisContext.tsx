import { createContext, useState } from "react";
import { getData } from "../services/API";

interface ProductAnalysisContext {
  getSalesByDate: (quarter: string, year: string) => void;
  salesByProduct: any[];
  salesByBrand: any[];
  salesByGroup: any[];
}

const initialState: ProductAnalysisContext = {
  getSalesByDate: async () => {},
  salesByProduct: undefined,
  salesByBrand: undefined,
  salesByGroup: undefined,
};

const productAnalysisContext =
  createContext<ProductAnalysisContext>(initialState);

const ProductAnalysisProvider = ({ children }: any) => {
  const [salesByProduct, setSalesByProduct] = useState<any[]>([]);
  const [salesByBrand, setSalesByBrand] = useState<any[]>([]);
  const [salesByGroup, setSalesGroup] = useState<any[]>([]);

  async function getSalesByBrand(quarter: string, year: string) {
    try {
      const endpoint = `/sales/brand?quarter=${quarter}&year=${year}`;
      const { result } = await getData(endpoint);
      result.sort((a, b) => b.saleValue - a.saleValue);
      setSalesByBrand(result);
    } catch (error) {
      console.log(error);
    }
  }

  async function getSalesByGroup(quarter: string, year: string) {
    try {
      const endpoint = `/sales/group?quarter=${quarter}&year=${year}`;
      const { result } = await getData(endpoint);
      result.sort((a, b) => b.saleValue - a.saleValue);
      setSalesGroup(result);
    } catch (error) {
      console.log(error);
    }
  }

  async function getSalesByProduct(quarter: string, year: string) {
    try {
      const endpoint = `/sales/product?quarter=${quarter}&year=${year}`;
      const { result } = await getData(endpoint);
      result.sort((a, b) => b.saleValue - a.saleValue);
      setSalesByProduct(result);
    } catch (error) {
      console.log(error);
    }
  }

  async function getSalesByDate(quarter: string, year: string) {
    try {
      await getSalesByProduct(quarter, year);
      await getSalesByGroup(quarter, year);
      await getSalesByBrand(quarter, year);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <productAnalysisContext.Provider
      value={{ getSalesByDate, salesByBrand, salesByGroup, salesByProduct }}
    >
      {children}
    </productAnalysisContext.Provider>
  );
};

export { productAnalysisContext, ProductAnalysisProvider };
