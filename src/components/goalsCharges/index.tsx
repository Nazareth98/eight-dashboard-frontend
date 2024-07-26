import { useContext, useEffect, useState } from "react";
import {
  formatCurrency,
  getStartAndEndOfWeek,
} from "../../utils/generalsUtils";
import CustomSubtitle from "../shared/customSubtitle";
import {
  Check,
  CheckCircle,
  Circle,
  MousePointerClick,
  NotebookPen,
  RefreshCcw,
  Sheet,
} from "lucide-react";
import { ChargeType } from "../../types/chargeType";
import { sheetsContext } from "../../contexts/sheetsContext";
import Loading from "../shared/loading";
import ComponentContainer from "../shared/componentContainer";
import { goalsContext } from "../../contexts/goalsContext";
import CustomButton from "../shared/customButton";
import { customerContext } from "../../contexts/customerContext";
import CustomerType from "../../types/customerType";

const GoalsCharges = ({ setSelectedSheetsData, charges, setCharges }) => {
  const { updateSearchData, setCurrentCustomer } = useContext(goalsContext);
  const { getCharges } = useContext(sheetsContext);
  const { customerData } = useContext(customerContext);

  const [currentWeek, setCurrentWeek] = useState<any>();
  const [chargesToShow, setChargesToShow] = useState<ChargeType[]>();
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  useEffect(() => {
    setChargesToShow(charges);
  }, [charges]);

  useEffect(() => {
    const weekData = getStartAndEndOfWeek();
    setCurrentWeek(weekData);
  }, []);

  async function updateData() {
    setCharges([]);
    const result = await getCharges();
    setCharges(result);
  }

  function toogleFiltered() {
    setIsFiltered(!isFiltered);
    if (!isFiltered) {
      const updatedData = chargesToShow.filter(
        (charge: ChargeType) => charge.balance !== 0
      );
      setChargesToShow(updatedData);
    } else {
      setChargesToShow(charges);
    }
  }

  async function handleGetData(event) {
    const digit = event.currentTarget.id;
    const customer = customerData.find(
      (customer: CustomerType) => customer.id == digit
    );
    setCurrentCustomer(customer);
    const currentSheetsData = charges.find(
      (charge: ChargeType) => charge.customerId == digit
    );
    setSelectedSheetsData(currentSheetsData);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const month = currentMonth > 10 ? `${currentMonth}` : `0${currentMonth}`;
    const year = `${currentDate.getFullYear()}`;
    updateSearchData(digit, month, year);
  }

  return (
    <ComponentContainer classToAdd="col-span-9 row-span-12">
      <div className="w-full flex items-center justify-between gap-2">
        <CustomSubtitle
          icon={<Sheet className="size-6 text-gray-600" />}
          subtitle="Planilha de Cobranças"
        />
        {currentWeek && (
          <div>
            <p className="text-gray-200 font-heading font-medium text-sm">{`Semana ${currentWeek.week} - De ${currentWeek.startOfWeek} à ${currentWeek.endOfWeek}`}</p>
          </div>
        )}
        <CustomButton theme="attention" onClick={updateData}>
          <RefreshCcw className="size-4" />
          atualizar
        </CustomButton>
      </div>

      {!chargesToShow ? (
        <Loading />
      ) : (
        <>
          <div className="w-full flex flex-col items-start gap-2">
            <div className="flex items-center gap-1">
              <MousePointerClick className="size-5 text-gray-700" />
              <span className="text-gray-400 font-heading ">Filtros</span>
            </div>
            <div>
              <CustomButton
                theme={isFiltered ? "default" : "alternate"}
                onClick={toogleFiltered}
              >
                {isFiltered ? (
                  <CheckCircle className="size-4" />
                ) : (
                  <Circle className="size-4" />
                )}
                somente com saldo
              </CustomButton>
            </div>
          </div>
          <div className="overflow-y-auto flex flex-col gap-4">
            {chargesToShow.map((charge: ChargeType) => {
              return (
                <div
                  id={charge.customerId.toString()}
                  key={charge.customerName}
                  onClick={handleGetData}
                  className="border-l-4 border-2 border-gray-900 border-l-primary-400 rounded p-2 cursor-pointer transition-all hover:bg-gray-900 active:bg-gray-950 fade-left"
                >
                  <div className="grid grid-cols-12 gap-2 fade-left">
                    <div className="flex flex-col gap-2 p-1 col-span-1">
                      <span className=" text-gray-500 text-xs font-semibold">
                        Curva ABC
                      </span>
                      <p
                        className={`text-xl font-semibold font-heading ${
                          charge.goal === 0
                            ? "text-gray-600"
                            : charge.percentageOfTarget > 66
                            ? "text-primary-600"
                            : charge.percentageOfTarget > 33
                            ? "text-yellow-400"
                            : "text-red-600"
                        }`}
                      >
                        {charge.percentageOfTarget > 66
                          ? "A"
                          : charge.percentageOfTarget > 33
                          ? "B"
                          : "C"}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 p-1 col-span-2">
                      <span className="text-gray-500 text-xs font-semibold">
                        Cliente
                      </span>
                      <p className="text-gray-100 text-sm font-heading">
                        {charge.customerName}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 p-1 col-span-2">
                      <span className="text-gray-500 text-xs font-semibold">
                        Saldo
                      </span>
                      <p
                        className={
                          "font-heading " +
                          (charge.balance > 0
                            ? "text-primary-500"
                            : charge.balance < 0
                            ? "text-red-500"
                            : "text-gray-600")
                        }
                      >
                        ${formatCurrency(charge.balance)}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 p-1 col-span-2">
                      <span className="text-gray-500 text-xs font-semibold">
                        Meta
                      </span>
                      <p
                        className={
                          "font-heading " +
                          (charge.goal > 0
                            ? "text-primary-500"
                            : charge.goal < 0
                            ? "text-red-500"
                            : `text-gray-600`)
                        }
                      >
                        ${formatCurrency(charge.goal)}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 p-1 col-span-2">
                      <span className="text-gray-500 text-xs font-semibold">
                        Pagamento
                      </span>
                      <p
                        className={
                          "font-heading " +
                          (charge.payment > 0
                            ? "text-primary-500"
                            : charge.payment < 0
                            ? "text-red-500"
                            : `text-gray-600`)
                        }
                      >
                        ${formatCurrency(charge.payment)}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 p-1 col-span-2">
                      <span className="text-gray-500 text-xs font-semibold">
                        Restante
                      </span>
                      <p
                        className={
                          "font-heading " +
                          (charge.diff > 0
                            ? "text-primary-500"
                            : charge.diff < 0
                            ? "text-red-500"
                            : `text-gray-600`)
                        }
                      >
                        ${formatCurrency(charge.diff)}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 p-1 col-span-1">
                      <span className=" text-gray-500 text-xs font-semibold">
                        % meta alcançada
                      </span>
                      <p
                        className={`font-semibold font-heading ${
                          charge.goal === 0
                            ? "text-gray-600"
                            : charge.percentageOfTarget > 66
                            ? "text-primary-600"
                            : charge.percentageOfTarget > 33
                            ? "text-yellow-400"
                            : "text-red-600"
                        }`}
                      >
                        %
                        {charge.goal !== 0
                          ? charge.percentageOfTarget.toFixed()
                          : 0}
                      </p>
                    </div>
                  </div>
                  {charge.obs !== "-" && (
                    <div className="flex items-center gap-2">
                      <NotebookPen className="size-5 text-gray-700" />
                      <p className="text-gray-400 italic">
                        <strong>OBS: </strong>
                        {charge.obs}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </ComponentContainer>
  );
};

export default GoalsCharges;
