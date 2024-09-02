import {
  ArrowLeftCircle,
  Banknote,
  BarChart2,
  Diff,
  Edit,
  Goal,
  RefreshCcw,
  UserCircle2,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { goalsContext } from "../../contexts/goalsContext";
import { ChargeType } from "../../types/chargeType";
import { formatCurrency } from "../../utils/generalsUtils";
import CustomSubtitle from "../shared/customSubtitle";
import CustomInput from "../shared/customInput";
import CustomButton from "../shared/customButton";
import { customerContext } from "../../contexts/customerContext";
import CustomerType from "../../types/customerType";

interface DetailsProps {
  selectedSheetsData: ChargeType;
}

const Details = ({ selectedSheetsData }: DetailsProps) => {
  const { selectedCustomer, updateGoal, updateCharges, cleanSearchData } =
    useContext(goalsContext);
  const [openInputGoal, setOpenInputGoal] = useState<boolean>(false);
  const [inputGoal, setInputGoal] = useState<number>();

  function handleOpenInputGoal() {
    setOpenInputGoal(true);
  }
  function handleCloseInputGoal() {
    setOpenInputGoal(false);
  }

  const handleUpdateGoal = async () => {
    if (!inputGoal) {
      alert("O valor da Taxa é obrigatório.");
      return;
    }
    await updateGoal(inputGoal, selectedCustomer.id);
    await updateCharges();

    cleanSearchData();

    // let updatedCurrentCustomer: CustomerType = selectedCustomer;
    // updatedCurrentCustomer.goal = inputGoal;
    // setCurrentCustomer(updatedCurrentCustomer);
    // setInputGoal(null);
    // setOpenInputGoal(false);
  };

  console.log(selectedSheetsData);

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
                    selectedCustomer.balance > 0
                      ? "text-primary-500"
                      : selectedCustomer.balance < 0
                      ? "text-red-500"
                      : "text-gray-600"
                  }`}
                >
                  ${formatCurrency(selectedCustomer.balance)}
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
              {openInputGoal ? (
                <>
                  <div className="w-full flex gap-2 mt-2 fade-left">
                    <CustomInput
                      type="number"
                      placeholder="0,00"
                      inputValue={inputGoal}
                      setValue={setInputGoal}
                    />
                    <CustomButton onClick={handleUpdateGoal}>
                      <RefreshCcw className="size-5" />
                    </CustomButton>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full h-full flex items-end justify-end fade-right">
                    <div className="flex items-center gap-2">
                      <h2
                        className={`text-xl font-heading font-semibold text-gray-200`}
                      >
                        ${formatCurrency(selectedSheetsData.goal)}
                      </h2>{" "}
                      <Edit
                        onClick={handleOpenInputGoal}
                        className="size-4 text-gray-600 cursor-pointer transition-all hover:text-gray-400"
                      />
                    </div>
                  </div>
                </>
              )}
              {openInputGoal && (
                <div
                  onClick={handleCloseInputGoal}
                  className="flex items-center gap-2 text-gray-700 cursor-pointer transition-all hover:text-gray-400 text-sm mt-1 fade-left"
                >
                  <ArrowLeftCircle className="size-4" />
                  Voltar
                </div>
              )}
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
                  ${formatCurrency(selectedSheetsData.payments)}
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
                    selectedCustomer.goal === 0
                      ? "text-gray-600"
                      : selectedSheetsData.percentageOfTarget > 66
                      ? "text-primary-600"
                      : selectedSheetsData.percentageOfTarget > 33
                      ? "text-yellow-400"
                      : "text-red-600"
                  }`}
                >
                  {selectedSheetsData.percentageOfTarget.toFixed()}%
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
