import { Settings } from "lucide-react";
import { useState } from "react";
import { getData } from "../../services/API";
import ComponentContainer from "../shared/componentContainer";
import CustomButton from "../shared/customButton";
import CustomInput from "../shared/customInput";
import CustomSubtitle from "../shared/customSubtitle";
import Loading from "../shared/loading";

const periodOption = [
  { value: 90, label: "3 meses" },
  { value: 180, label: "6 meses" },
  { value: 365, label: "1 ano" },
];

const SugesttionForm = ({ setSuggestionData }) => {
  const [period, setPeriod] = useState<number>(365);
  const [frequency, setFrequency] = useState<number>(30);
  const [deliveryTime, setDeliveryTime] = useState<number>(30);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getSuggestion(event) {
    event.preventDefault();
    setIsLoading(true);
    if (!period) {
      console.log(period);
      alert("Selecione um período");
      return;
    }

    if (!frequency) {
      console.log(frequency);
      alert("Frequência de compra inválida.");
      return;
    }

    if (!deliveryTime) {
      console.log(deliveryTime);
      alert("Prazo de entrega inválida");
      return;
    }

    try {
      const endpoint = `/purchase-suggestions?period=${period}&frequency=${frequency}&deliveryTime=${deliveryTime}`;
      const response = await getData(endpoint);
      setSuggestionData(response.result);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleChange(event) {
    setPeriod(event.target.value);
  }

  return (
    <ComponentContainer classToAdd="row-span-5 col-span-3">
      <CustomSubtitle subtitle="Gerar Sugestão" />
      <form className="w-full h-full grid grid-cols-6 gap-4">
        <div className="col-span-6">
          <label className="text-gray-200 text-sm font-medium">
            Selecione um Período
          </label>
          <select
            className="w-full bg-gray-900 p-2 border-2 border-gray-800 text-gray-200 rounded "
            value={period}
            onChange={handleChange}
          >
            <option value="">Selecione um Período</option>
            {periodOption.map((option) => {
              return <option value={option.value}>{option.label}</option>;
            })}
          </select>
        </div>
        <div className="col-span-3">
          <CustomInput
            setValue={setFrequency}
            inputValue={frequency}
            label="Frequência de compra:"
            type="number"
            placeholder="Em dias"
          />
        </div>
        <div className="col-span-3">
          <CustomInput
            setValue={setDeliveryTime}
            inputValue={deliveryTime}
            label="Prazo de entrega:"
            type="number"
            placeholder="Em dias"
          />
        </div>
        <div
          className="col-span-6 flex items-center justify-end gap-4
        "
        >
          <div className="">{isLoading && <Loading />}</div>
          <CustomButton onClick={getSuggestion}>
            <Settings className="size-4" />
            gerar sugestão
          </CustomButton>
        </div>
      </form>
    </ComponentContainer>
  );
};

export default SugesttionForm;
