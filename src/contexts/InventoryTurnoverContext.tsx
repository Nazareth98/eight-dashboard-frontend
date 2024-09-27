import { createContext, useState } from "react";
import { getData } from "../services/API";

export interface InventoryTurnoverDataType {
  id: number | string;
  description: string;
  initialBalance: number;
  finalBalance: number;
  averageStock: number;
  totalPurchases: number;
  CMV: number;
  inventoryTurnover: number;
}

interface InventoryTurnoverContext {
  dataByGroup: InventoryTurnoverDataType[];
  dataByProduct: InventoryTurnoverDataType[];
  dataByBrand: InventoryTurnoverDataType[];
  updateData: (period) => Promise<void>;
}

const initialState: InventoryTurnoverContext = {
  dataByBrand: undefined,
  dataByGroup: undefined,
  dataByProduct: undefined,
  updateData: async (period) => {},
};

const inventoryTurnoverContext =
  createContext<InventoryTurnoverContext>(initialState);

const InventoryTurnoverProvider = ({ children }: any) => {
  const [dataByBrand, setDataByBrand] = useState<InventoryTurnoverDataType[]>();
  const [dataByProduct, setDataByProduct] =
    useState<InventoryTurnoverDataType[]>();
  const [dataByGroup, setDataByGroup] = useState<InventoryTurnoverDataType[]>();

  async function getDataByBrand(period) {
    try {
      const endpoint = `/inventory-turnover/brand?period=${period}`;
      const { result } = await getData(endpoint);
      setDataByBrand(result);
    } catch (error) {
      throw new Error(error);
    }
  }

  async function getDataByProduct(period) {
    try {
      const endpoint = `/inventory-turnover/product?period=${period}`;
      const { result } = await getData(endpoint);
      setDataByProduct(result);
    } catch (error) {
      throw new Error(error);
    }
  }

  async function getDataByGroup(period) {
    try {
      const endpoint = `/inventory-turnover/group?period=${period}`;
      const { result } = await getData(endpoint);
      setDataByGroup(result);
    } catch (error) {
      throw new Error(error);
    }
  }

  async function updateData(period) {
    try {
      await getDataByBrand(period);
      await getDataByProduct(period);
      await getDataByGroup(period);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <inventoryTurnoverContext.Provider
      value={{
        dataByBrand,
        dataByGroup,
        dataByProduct,
        updateData,
      }}
    >
      {children}
    </inventoryTurnoverContext.Provider>
  );
};

export { inventoryTurnoverContext, InventoryTurnoverProvider };
