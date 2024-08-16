import { useContext, useEffect } from "react";
import ProviderDetails from "../../components/providerDetails";
import ProvidersDetails from "../../components/providersDetails";
import ProvidersInfo from "../../components/providersInfo";
import ProvidersList from "../../components/providersList";
import ScreenContainer from "../../components/shared/screenContainer";
import { providersContext } from "../../contexts/providersContext";

const Providers = () => {
  const { updateProviders, providerPurchases, currentProvider } =
    useContext(providersContext);

  useEffect(() => {
    async function loadData() {
      await updateProviders();
    }
    loadData();
  }, []);

  return (
    <ScreenContainer>
      {providerPurchases && currentProvider ? (
        <ProviderDetails />
      ) : (
        <>
          <ProvidersDetails />
          <ProvidersInfo />
          <ProvidersList />
        </>
      )}
    </ScreenContainer>
  );
};

export default Providers;
