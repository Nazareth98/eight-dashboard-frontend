import { Calendar, Search, SearchCheck } from "lucide-react";
import React, { Dispatch, useContext, useState } from "react";
import { goalsContext } from "../../contexts/goalsContext";
import { ChargeType } from "../../types/chargeType";
import CustomerType from "../../types/customerType";
import { PaymentType } from "../../types/paymentType";
import CustomButton from "../shared/customButton";
import CustomInput from "../shared/customInput";
import CustomSubtitle from "../shared/customSubtitle";

interface GoalsFormProps {
  data: PaymentType[];
  setSelectedSheetsData: Dispatch<React.SetStateAction<any>>;
  charges: ChargeType[];
}

const GoalsForm = ({ setSelectedSheetsData, charges }: GoalsFormProps) => {
  const { updateSearchData, selectedCustomer } = useContext(goalsContext);

  const [selectMonth, setSelectMonth] = useState<number>();
  const [selectYear, setSelectYear] = useState<number>();

  async function handleGetData() {
    if (!selectedCustomer) {
      alert("É necessário ter um cliente selecionado.");
      return;
    }

    if (!selectMonth) {
      alert("É necessário selecionar um mês.");
      return;
    }

    if (!selectYear) {
      alert("É necessário selecionar um ano.");
      return;
    }

    if (!charges) {
      alert("Aguarde os dados da planilha serem carregados.");
      return;
    }

    const month =
      Number(selectMonth) < 10
        ? `0${Number(selectMonth)}`
        : `${Number(selectMonth)}`;
    const year = selectYear.toString();
    const currentSheetsData = charges.find(
      (charge: ChargeType) => charge.customerId == selectedCustomer.id
    );
    setSelectedSheetsData(currentSheetsData);
    await updateSearchData(selectedCustomer.id, month, year);
  }

  return (
    <div className="space-y-4">
      <CustomSubtitle
        icon={<Search className="size-6 text-gray-600" />}
        subtitle="Buscar Dados"
      />
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex items-center gap-2">
          <CustomInput
            label="Mês"
            type="number"
            min="1"
            max="12"
            placeholder="MM"
            inputValue={selectMonth}
            setValue={setSelectMonth}
            icon={<Calendar className="size-5 text-gray-700" />}
          />
          <CustomInput
            label="Ano"
            type="number"
            min="2000"
            max="2100"
            placeholder="AAAA"
            inputValue={selectYear}
            setValue={setSelectYear}
            icon={<Calendar className="size-5 text-gray-700" />}
          />
        </div>
      </div>
      <div className="w-full flex justify-end">
        <CustomButton onClick={handleGetData}>
          <SearchCheck className="size-4" />
          buscar
        </CustomButton>
      </div>
    </div>
  );
};

export default GoalsForm;
