import { createContext, useState } from "react";
import { ProviderType } from "../types/providerType";
import { getData } from "../services/API";

interface ProductType {
  product: number;
  description: string;
  brand: string;
  group: string;
  amount: number;
  price: number;
  totalPrice: number;
}

interface ProviderPurchasesType {
  date: string;
  invoice: number;
  providerCod: number;
  providerName: string;
  total: number;
  products: ProductType[];
}

interface ProviderPurchasesMonth {
  value: number;
  month: string;
  payments: number;
  purchases: ProviderPurchasesType[];
}

interface ProvidersContext {
  updateProviders: () => void;
  selectProvider: (provider: ProviderType) => void;
  cleanSearchData: () => void;
  providers: ProviderType[];
  currentProvider: ProviderType;
  providerPurchases: ProviderPurchasesMonth[];
}

const initialState: ProvidersContext = {
  updateProviders: () => {},
  cleanSearchData: () => {},
  selectProvider: () => {},
  providers: [],
  currentProvider: undefined,
  providerPurchases: undefined,
};

const providersContext = createContext<ProvidersContext>(initialState);

const ProvidersContextProvider = ({ children }: any) => {
  const [providers, setProviders] = useState<ProviderType[]>();
  const [currentProvider, setCurrentProvider] = useState<ProviderType>();
  const [providerPurchases, setProviderPurchases] =
    useState<ProviderPurchasesMonth[]>();

  async function updateProviders() {
    try {
      if (providers) cleanProviders();
      const endpoint = "/providers";
      const { result } = await getData(endpoint);
      setProviders(result);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  function cleanSearchData() {
    setCurrentProvider(undefined);
    setProviderPurchases(undefined);
  }

  function cleanProviders() {
    setProviders(undefined);
  }

  async function getProviderPurchases(id: number) {
    try {
      const endpoint = `/providers/purchases/${id}`;
      const { result } = await getData(endpoint);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async function selectProvider(provider: ProviderType) {
    try {
      const purchases = await getProviderPurchases(provider.id);
      setProviderPurchases(purchases);
      setCurrentProvider(provider);
      console.log(purchases);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <providersContext.Provider
      value={{
        updateProviders,
        cleanSearchData,
        selectProvider,
        providers,
        currentProvider,
        providerPurchases,
      }}
    >
      {children}
    </providersContext.Provider>
  );
};

export { providersContext, ProvidersContextProvider };
