import { RefreshCcw, Truck } from "lucide-react";
import { useContext } from "react";
import { overviewContext } from "../../contexts/overviewContext";
import { formatCurrency } from "../../utils/generalsUtils";
import ComponentContainer from "../shared/componentContainer";
import CustomButton from "../shared/customButton";
import CustomSubtitle from "../shared/customSubtitle";
import Loading from "../shared/loading";

const ProvidersList = ({ providers, setProviders }) => {
  const { getProviders } = useContext(overviewContext);

  async function handleUpdateProviders() {
    try {
      setProviders();
      const result = await getProviders();
      setProviders(result);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  }

  return (
    <ComponentContainer cols="9" rows="10">
      <div className="w-full flex justify-between">
        <CustomSubtitle
          icon={<Truck className="size-6" />}
          subtitle="Todos os Provedores"
        />
        <CustomButton theme="attention" onClick={handleUpdateProviders}>
          <RefreshCcw className="size-4" />
          atualizar
        </CustomButton>
      </div>

      {!providers ? (
        <Loading />
      ) : (
        <div className="overflow-y-auto flex flex-col gap-4 ">
          {providers?.map((provider) => {
            return (
              <div className="border-l-4 border-2 border-gray-900 border-l-primary-400 rounded grid grid-cols-12 p-1 gap-2 transition-all fade-left hover:bg-gray-900 fade-left">
                <div className="flex flex-col gap-2 p-1 col-span-1">
                  <span className="text-gray-500 text-xs font-semibold">
                    Código
                  </span>
                  <p className="text-gray-100 text-sm font-heading">
                    {provider.digit}
                  </p>
                </div>
                <div className="flex flex-col gap-2 p-1 col-span-3">
                  <span className="text-gray-500 text-xs font-semibold">
                    Nome
                  </span>
                  <p className="text-gray-100 text-sm font-heading">
                    {provider.name}
                  </p>
                </div>
                <div className="flex flex-col gap-2 p-1 col-span-2">
                  <span className="text-gray-500 text-xs font-semibold">
                    Saldo Sistema
                  </span>
                  <p
                    className={
                      "font-heading " +
                      (provider.balance > 0
                        ? "text-primary-500 "
                        : provider.balance < 0
                        ? "text-red-500"
                        : `text-gray-600`)
                    }
                  >
                    ${formatCurrency(provider.balance)}
                  </p>
                </div>
                <div className="flex flex-col gap-2 p-1 col-span-2">
                  <span className="text-gray-500 text-xs font-semibold">
                    Saldo Planilha
                  </span>
                  <p
                    className={
                      "font-heading " +
                      (provider.sheetsBalance > 0
                        ? "text-primary-500"
                        : provider.sheetsBalance < 0
                        ? "text-red-500"
                        : `text-gray-600`)
                    }
                  >
                    ${formatCurrency(provider.sheetsBalance)}
                  </p>
                </div>

                <div className="flex flex-col gap-2 p-1 col-span-2">
                  <span className="text-gray-500 text-xs font-semibold">
                    Diferença
                  </span>
                  <p
                    className={
                      "font-heading " +
                      (provider.balance - provider.sheetsBalance > 0
                        ? "text-primary-500"
                        : provider.balance - provider.sheetsBalance < 0
                        ? "text-red-500"
                        : `text-gray-600`)
                    }
                  >
                    ${formatCurrency(provider.balance - provider.sheetsBalance)}
                  </p>
                </div>
                <div className="flex flex-col gap-2 p-1 col-span-2">
                  <span className="text-gray-500 text-xs font-semibold">
                    Vencido
                  </span>
                  <p className="text-gray-100 text-sm font-heading">
                    ${formatCurrency(provider.pastDueAmount)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </ComponentContainer>
  );
};

export default ProvidersList;