import { createContext, useState } from "react";
import { ProviderType } from "../types/providerType";
import { getData } from "../services/API";

interface ProvidersContext {
  updateProviders: () => void;
  providers: ProviderType[];
}

const initialState: ProvidersContext = {
  updateProviders: () => {},
  providers: [],
};

const providersContext = createContext<ProvidersContext>(initialState);

const ProvidersContextProvider = ({ children }: any) => {
  const [providers, setProviders] = useState<ProviderType[]>();

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

  function cleanProviders() {
    setProviders(undefined);
  }

  return (
    <providersContext.Provider value={{ updateProviders, providers }}>
      {children}
    </providersContext.Provider>
  );
};

export { providersContext, ProvidersContextProvider };
