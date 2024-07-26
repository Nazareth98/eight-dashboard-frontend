import { createContext, useState } from "react";
import { getData } from "../services/API";

interface ProductAnalysisContext {
  getSalesByDate: (month: string, year: string) => void;
  salesByProduct: any[];
  salesByBrand: any[];
  salesByGroup: any[];
}

const initialState: ProductAnalysisContext = {
  getSalesByDate: async () => {},
  salesByProduct: [],
  salesByBrand: [],
  salesByGroup: [],
};

const productAnalysisContext =
  createContext<ProductAnalysisContext>(initialState);

const ProductAnalysisProvider = ({ children }: any) => {
  const [salesByProduct, setSalesByProduct] = useState<any[]>();
  const [salesByBrand, setSalesByBrand] = useState<any[]>();
  const [salesByGroup, setSalesGroup] = useState<any[]>();

  async function getSalesByBrand(month: string, year: string) {
    try {
      const endpoint = `/data/sales-products/brand?month=${month}&year=${year}`;
      const { result } = await getData(endpoint);
      result.sort((a, b) => b.saleValue - a.saleValue);
      setSalesByBrand(result);
    } catch (error) {
      console.log(error);
    }
  }

  async function getSalesByGroup(month: string, year: string) {
    try {
      const endpoint = `/data/sales-products/group?month=${month}&year=${year}`;
      const { result } = await getData(endpoint);
      result.sort((a, b) => b.saleValue - a.saleValue);
      setSalesGroup(result);
    } catch (error) {
      console.log(error);
    }
  }

  async function getSalesByProduct(month: string, year: string) {
    try {
      const endpoint = `/data/sales-products/product?month=${month}&year=${year}`;
      const { result } = await getData(endpoint);
      result.sort((a, b) => b.saleValue - a.saleValue);
      setSalesByProduct(result);
    } catch (error) {
      console.log(error);
    }
  }

  async function getSalesByDate(month: string, year: string) {
    try {
      await getSalesByProduct(month, year);
      await getSalesByGroup(month, year);
      await getSalesByBrand(month, year);
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
