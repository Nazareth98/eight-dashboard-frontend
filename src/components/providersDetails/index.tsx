import CustomSubtitle from "../shared/customSubtitle";
import IconOrders from "../../assets/svg/iconOrders";
import { ProviderType } from "../../types/providerType";
import Select, { StylesConfig } from "react-select";
import { useEffect, useState } from "react";
import CardIconInfo from "../shared/cardIconInfo";
import IconUser from "../../assets/svg/iconUser";
import IconArrowRight from "../../assets/svg/iconArrowRight";
import { formatCurrency, getSelectStyles } from "../../utils/generalsUtils";
import Loading from "../shared/loading";
import {
  Banknote,
  Calendar,
  CalendarCheck,
  CalendarClock,
  CalendarX2,
  HandCoins,
  UserCircle,
} from "lucide-react";

interface ProviderProps {
  providers: ProviderType[];
}

const ProvidersDetails = ({ providers }: ProviderProps) => {
  const [selectedOption, setSelectedOption] = useState<ProviderType>();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const updatedOptions = providers?.map((provider) => {
      provider.value = provider.id;
      provider.label = `#${provider.id} - ${provider.name}`;

      return provider;
    });
    setOptions(updatedOptions);
  }, [providers]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const customStyles: StylesConfig = getSelectStyles();

  return (
    <div className="col-span-3 row-span-12 p-6 rounded-xl border-2 border-gray-900 flex flex-col gap-10 fade-left">
      <CustomSubtitle
        icon={<IconOrders fill="fill-gray-500" width="25px" />}
        subtitle="Visualizar Detalhes"
      />

      {!providers ? (
        <Loading />
      ) : (
        <>
          <Select
            options={options}
            onChange={handleChange}
            styles={customStyles}
          />
          <div className="w-full h-full flex flex-col items-start gap-4">
            <div className="w-full h-full flex-1  flex items-center gap-2 fade-left">
              <UserCircle className="size-5 text-gray-600" />
              <h2 className="text-xl text-gray-300 font-heading font-semibold ">
                {selectedOption?.name}
              </h2>
            </div>

            <div className="w-full h-full flex-[2] flex flex-col fade-left">
              <div className="flex items-center gap-2">
                <Banknote className="size-4 text-gray-700" />
                <span className="text-gray-500 font-heading text-sm">
                  Saldo
                </span>
              </div>
              <div className="w-full h-full flex items-end justify-end">
                <h2
                  className={`text-4xl font-heading font-semibold ${
                    selectedOption?.balance > 0
                      ? "text-primary-300"
                      : "text-red-400"
                  }`}
                >
                  ${formatCurrency(selectedOption?.balance)}
                </h2>
              </div>
            </div>

            <div className="w-24 m-auto h-[2px] bg-gray-900" />
            <div className="w-full h-full flex-1 flex flex-col">
              <div className="flex items-center gap-2">
                <CalendarX2 className="size-4 text-gray-700" />
                <span className="text-gray-500 font-heading text-sm">
                  Vencido
                </span>
              </div>
              <div className="w-full h-full flex items-end justify-end fade-right">
                <h2 className="text-xl text-gray-300 font-heading font-semibold ">
                  ${formatCurrency(selectedOption?.pastDueAmount)}
                </h2>
              </div>
            </div>

            <div className="w-24 m-auto h-[2px] bg-gray-900" />
            <div className="w-full h-full flex-1 flex flex-col">
              <div className="flex items-center gap-2">
                <CalendarClock className="size-4 text-gray-700" />

                <span className="text-gray-500 font-heading text-sm">
                  Vencendo
                </span>
              </div>
              <div className="w-full h-full flex items-end justify-end fade-right">
                <h2 className="text-xl text-gray-300 font-heading font-semibold ">
                  ${formatCurrency(selectedOption?.amountExpiring)}
                </h2>
              </div>
            </div>

            <div className="w-24 m-auto h-[2px] bg-gray-900" />
            <div className="w-full h-full flex-1 flex flex-col">
              <div className="w-full flex items-start justify-start gap-2">
                <HandCoins className="size-4 text-gray-700" />
                <span className="text-gray-500 font-heading text-sm">
                  Ult. Pagamento
                </span>
              </div>
              <div className="w-full h-full flex items-end justify-between fade-right">
                <span className="text-gray-600 font-semibold text-sm">
                  {selectedOption?.lastPayment}
                </span>
                <h2 className="text-xl text-gray-300 font-heading font-semibold ">
                  ${formatCurrency(selectedOption?.lastPaymentValue)}
                </h2>
              </div>
            </div>

            <div className="w-24 m-auto h-[2px] bg-gray-900" />
            <div className="w-full h-full flex-1 flex flex-col">
              <div className="w-full flex items-start justify-start gap-2">
                <HandCoins className="size-4 text-gray-700" />
                <span className="text-gray-500 font-heading text-sm">
                  Ult. Compra
                </span>
              </div>
              <div className="w-full h-full flex items-end justify-between fade-right">
                <span className="text-gray-600 font-semibold text-sm">
                  {selectedOption?.lastPurchase}
                </span>
                <h2 className="text-xl text-gray-300 font-heading font-semibold ">
                  ${formatCurrency(selectedOption?.lastPurchaseValue)}
                </h2>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProvidersDetails;
