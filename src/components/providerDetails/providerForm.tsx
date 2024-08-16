import { useContext, useState } from "react";
import { providersContext } from "../../contexts/providersContext";
import CustomInput from "../shared/customInput";
import { Calendar, SearchCheck } from "lucide-react";
import CustomButton from "../shared/customButton";

const ProviderForm = ({ setSelectWeek }) => {
  const { selectProvider, currentProvider } = useContext(providersContext);

  const [selectMonth, setSelectMonth] = useState<number>();
  const [selectYear, setSelectYear] = useState<number>();

  async function handleGetData() {
    if (!currentProvider) {
      alert("É necessário ter um Provedor selecionado.");
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

    const month =
      Number(selectMonth) < 10
        ? `0${Number(selectMonth)}`
        : `${Number(selectMonth)}`;
    const year = selectYear;
    selectProvider(currentProvider, month, year);
    setSelectWeek(undefined);
  }

  return (
    <div className="space-y-4">
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

export default ProviderForm;
