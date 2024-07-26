import React, { useContext } from "react";
import CustomSubtitle from "../shared/customSubtitle";
import { Banknote, BarChart2, Diff, Goal, UserCircle2 } from "lucide-react";
import { PaymentType } from "../../types/paymentType";
import { ChargeType } from "../../types/chargeType";
import { formatCurrency } from "../../utils/generalsUtils";
import { goalsContext } from "../../contexts/goalsContext";

interface DetailsProps {
  selectedSheetsData: ChargeType;
}

const Details = ({ selectedSheetsData }: DetailsProps) => {
  const { selectedCustomer } = useContext(goalsContext);

  console.log("selectedSheetsData", selectedSheetsData);
  return (
    <>
      <CustomSubtitle
        icon={<UserCircle2 className="size-6" />}
        subtitle={selectedCustomer?.name}
      />
      <div className="w-full h-full flex flex-col items-start gap-4">
        {selectedSheetsData && (
          <>
            <div className="w-full h-full flex-[2] flex flex-col fade-left">
              <div className="flex items-center gap-2">
                <Banknote className="size-4 text-gray-700" />
                <span className="w-1/2 text-gray-500 font-heading text-sm">
                  Saldo
                </span>
              </div>
              <div className="w-full h-full flex items-end justify-end fade-right">
                <h2
                  className={`text-4xl font-heading font-semibold ${
                    selectedSheetsData.balance > 0
                      ? "text-primary-500"
                      : selectedSheetsData.balance < 0
                      ? "text-red-500"
                      : "text-gray-600"
                  }`}
                >
                  ${formatCurrency(selectedSheetsData.balance)}
                </h2>
              </div>
            </div>

            <div className="w-24 m-auto h-[2px] bg-gray-900" />
            <div className="w-full h-full flex-1 flex flex-col">
              <div className="flex items-center gap-2">
                <Goal className="size-4 text-gray-700" />

                <span className="w-1/2 text-gray-500 font-heading text-sm">
                  Meta semanal
                </span>
              </div>
              <div className="w-full h-full flex items-end justify-end fade-right">
                <h2
                  className={`text-xl font-heading font-semibold text-gray-200`}
                >
                  ${formatCurrency(selectedSheetsData.goal)}
                </h2>
              </div>
            </div>

            <div className="w-24 m-auto h-[2px] bg-gray-900" />
            <div className="w-full h-full flex-1 flex flex-col">
              <div className="flex items-center gap-2">
                <BarChart2 className="size-4 text-gray-700" />
                <span className="w-1/2 text-gray-500 font-heading text-sm">
                  Pagamentos
                </span>
              </div>
              <div className="w-full h-full flex items-end justify-end fade-right">
                <h2
                  className={`text-xl font-heading font-semibold text-gray-200`}
                >
                  ${formatCurrency(selectedSheetsData.payment)}
                </h2>
              </div>
            </div>

            <div className="w-24 m-auto h-[2px] bg-gray-900" />
            <div className="w-full h-full flex-1 flex flex-col">
              <div className="flex items-center gap-2">
                <Diff className="size-4 text-gray-700" />
                <span className="w-1/2 text-gray-500 font-heading text-sm">
                  Diferença
                </span>
              </div>
              <div className="w-full h-full flex items-end justify-end fade-right">
                <h2
                  className={`text-xl font-heading font-semibold text-gray-200`}
                >
                  ${formatCurrency(selectedSheetsData.diff)}
                </h2>
              </div>
            </div>

            <div className="w-24 m-auto h-[2px] bg-gray-900" />
            <div className="w-full h-full flex-1 flex flex-col">
              <div className="flex items-center gap-2">
                <Diff className="size-4 text-gray-700" />
                <span className="w-1/2 text-gray-500 font-heading text-sm">
                  % Meta Alcançada
                </span>
              </div>
              <div className="w-full h-full flex items-end justify-end fade-right">
                <h2
                  className={`text-xl font-heading font-semibold ${
                    selectedSheetsData.goal === 0
                      ? "text-gray-600"
                      : selectedSheetsData.percentageOfTarget > 66
                      ? "text-primary-600"
                      : selectedSheetsData.percentageOfTarget > 33
                      ? "text-yellow-400"
                      : "text-red-600"
                  }`}
                >
                  %
                  {selectedSheetsData.goal !== 0
                    ? (
                        (selectedSheetsData.payment / selectedSheetsData.goal) *
                        100
                      ).toFixed()
                    : 0}
                </h2>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Details;
