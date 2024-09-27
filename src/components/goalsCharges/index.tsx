import jsPDF from "jspdf";
import {
  CheckCircle,
  Circle,
  MousePointerClick,
  Printer,
  RefreshCcw,
  Sheet,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { customerContext } from "../../contexts/customerContext";
import { goalsContext } from "../../contexts/goalsContext";
import { ChargeType } from "../../types/chargeType";
import CustomerType from "../../types/customerType";
import {
  formatCurrency,
  getStartAndEndOfWeek,
} from "../../utils/generalsUtils";
import ComponentContainer from "../shared/componentContainer";
import CustomButton from "../shared/customButton";
import CustomSubtitle from "../shared/customSubtitle";
import Loading from "../shared/loading";

const GoalsCharges = ({ setSelectedSheetsData }) => {
  const { updateSearchData, setCurrentCustomer, updateCharges, charges } =
    useContext(goalsContext);
  const { customerData } = useContext(customerContext);
  const [currentWeek, setCurrentWeek] = useState<any>();
  const [chargesToShow, setChargesToShow] = useState<ChargeType[]>();
  const [isFiltered, setIsFiltered] = useState<boolean>(true);

  useEffect(() => {
    function loadData() {
      const filteredCharges = charges?.filter(
        (charge: ChargeType) => charge.balance != 0
      );
      setChargesToShow(filteredCharges);
    }
    if (charges) {
      loadData();
    }
  }, [charges]);

  useEffect(() => {
    const weekData = getStartAndEndOfWeek();
    setCurrentWeek(weekData);
  }, []);

  async function updateData() {
    await updateCharges();
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
    const currentSheetsData = charges.find((charge) => charge.id == digit);
    console.log(currentSheetsData);
    setSelectedSheetsData(currentSheetsData);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const month = currentMonth > 10 ? `${currentMonth}` : `0${currentMonth}`;
    const year = `${currentDate.getFullYear()}`;
    updateSearchData(digit, month, year);
  }

  const exportPDF = () => {
    const doc = new jsPDF();

    // Obtenha a data atual no formato brasileiro
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(
      today.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${today.getFullYear()}`;
    const formattedTime = `${today
      .getHours()
      .toString()
      .padStart(2, "0")}:${today
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${today.getSeconds().toString().padStart(2, "0")}`;

    // Adiciona o cabeçalho com a data e a hora
    doc.setFontSize(12);
    doc.text(`${formattedDate} - ${formattedTime}`, 14, 15);

    // Adiciona o título
    doc.setFontSize(18);
    doc.text("Metas", 14, 30);

    // Calcula as somas dos valores desejados
    const totalBalance = chargesToShow.reduce(
      (sum, row) => sum + row.balance,
      0
    );
    const totalGoal = chargesToShow.reduce((sum, row) => sum + row.goal, 0);
    const totalPayment = chargesToShow.reduce(
      (sum, row) => sum + row.payments,
      0
    );
    const totalDiff = chargesToShow.reduce((sum, row) => sum + row.diff, 0);

    console.log(chargesToShow[0]);

    // Adiciona a tabela
    doc.autoTable({
      startY: 40,
      head: [["Cliente", "Saldo", "Meta", "Pagamentos", "Restante"]],
      body: chargesToShow?.map((row) => [
        row.name,
        `$${formatCurrency(row.balance)}`,
        `$${formatCurrency(row.goal)}`,
        `$${formatCurrency(row.payments)}`,
        `$${formatCurrency(row.diff)}`,
        `${row.percentageOfTarget}%`,
      ]),
      theme: "grid",
      headStyles: { fillColor: [40, 40, 40] },
      margin: { horizontal: 10 },
    });

    // Adiciona as somas ao final da tabela
    const finalY = doc.previousAutoTable.finalY;
    doc.setFontSize(12);
    doc.text(`Total Saldo: $${formatCurrency(totalBalance)}`, 14, finalY + 10);
    doc.text(`Total Meta: $${formatCurrency(totalGoal)}`, 14, finalY + 20);
    doc.text(
      `Total Pagamentos: $${formatCurrency(totalPayment)}`,
      14,
      finalY + 30
    );
    doc.text(`Total Restante: $${formatCurrency(totalDiff)}`, 14, finalY + 40);
    doc.save(`metas-${formattedDate}-${formattedTime}.pdf`);
  };

  console.log(chargesToShow);

  return (
    <ComponentContainer classToAdd="col-span-9 row-span-12">
      <div className="w-full flex items-center justify-between gap-2">
        <CustomSubtitle
          icon={<Sheet className="size-6" />}
          subtitle="Planilha de Cobranças"
        />
        {currentWeek && (
          <div>
            <p className="text-gray-200 font-heading font-medium text-sm">{`Semana ${currentWeek.week} - De ${currentWeek.startOfWeek} à ${currentWeek.endOfWeek}`}</p>
          </div>
        )}
        <div className="flex gap-2">
          <CustomButton theme="alternate" onClick={exportPDF}>
            <Printer className="size-4" />
            imprimir
          </CustomButton>
          <CustomButton theme="attention" onClick={updateData}>
            <RefreshCcw className="size-4" />
            atualizar
          </CustomButton>
        </div>
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
            {chargesToShow?.map((charge) => {
              return (
                <div
                  id={charge.id.toString()}
                  key={charge.customerName}
                  onClick={handleGetData}
                  className="border-l-4 border-2 border-gray-900 border-l-primary-400 rounded p-2 cursor-pointer transition-all hover:bg-gray-900 active:bg-gray-950 fade-left"
                >
                  <div className="grid grid-cols-12 gap-2 fade-left">
                    <div className="flex flex-col gap-2 p-1 col-span-2">
                      <span className="text-gray-500 text-xs font-semibold">
                        Cliente
                      </span>
                      <p className="text-gray-100 text-sm font-heading">
                        {charge.name}
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
                          (charge.payments > 0
                            ? "text-primary-500"
                            : charge.payments < 0
                            ? "text-red-500"
                            : `text-gray-600`)
                        }
                      >
                        ${formatCurrency(charge.payments)}
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
                        {charge.goal !== 0
                          ? charge.percentageOfTarget.toFixed()
                          : 0}
                        %
                      </p>
                    </div>
                  </div>
                  {/* {charge.obs !== "-" && (
                    <div className="flex items-center gap-2">
                      <NotebookPen className="size-5 text-gray-700" />
                      <p className="text-gray-400 italic">
                        <strong>OBS: </strong>
                        {charge.obs}
                      </p>
                    </div>
                  )} */}
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
