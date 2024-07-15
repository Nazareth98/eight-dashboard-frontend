import { useContext, useEffect, useState } from "react";
import ProvidersDetails from "../../components/providersDetails";
import ProvidersInfo from "../../components/providersInfo";
import ProvidersList from "../../components/providersList";
import ScreenContainer from "../../components/shared/screenContainer";
import { overviewContext } from "../../contexts/overviewContext";
import { ProviderType } from "../../types/providerType";

const Providers = () => {
  const { getProviders } = useContext(overviewContext);

  const [providers, setProviders] = useState<ProviderType[]>();

  useEffect(() => {
    async function loadData() {
      const result = await getProviders();
      setProviders(result);
    }
    loadData();
  }, []);

  async function handleUpdateData() {
    const result = await getProviders();
    setProviders(result);
  }

  return (
    <ScreenContainer>
      <ProvidersDetails providers={providers} />
      <ProvidersInfo providers={providers} />
      <ProvidersList providers={providers} setProviders={setProviders} />
    </ScreenContainer>
  );
};

export default Providers;
