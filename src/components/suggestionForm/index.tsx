import { FilePenLine, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { getData } from "../../services/API";
import ComponentContainer from "../shared/componentContainer";
import CustomButton from "../shared/customButton";
import CustomInput from "../shared/customInput";
import CustomSubtitle from "../shared/customSubtitle";
import Loading from "../shared/loading";

interface OptionType {
  value: number | string;
  label: string;
}

interface GroupType {
  classif: string;
  description: string;
  quantityPerBox: number;
}

const SugesttionForm = ({ setSuggestionData }) => {
  const [period, setPeriod] = useState<number>();
  const [quantity, setQuantity] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectOptions, setSelectOptions] = useState<OptionType[]>();
  const [groups, setGroups] = useState<GroupType[]>();
  const [selectedGroup, setSelectedGroup] = useState<GroupType>();

  useEffect(() => {
    async function getGroups() {
      try {
        const endpoint = "/purchase-suggestions/cbm-data";
        const response = await getData(endpoint);
        if (!response.result) {
          alert(response.message);
          return;
        }
        const options: OptionType[] = [];
        const groups: GroupType[] = response.result;
        groups.forEach((group) => {
          options.push({
            label: group.description,
            value: group.classif,
          });
        });
        setSelectOptions(options);
        setGroups(groups);
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }

    getGroups();
  }, []);

  async function getSuggestion(event) {
    event.preventDefault();
    setIsLoading(true);
    console.log(selectedGroup);
    if (!selectedGroup) {
      alert("Selecione um grupo");
      return;
    }

    if (!quantity) {
      console.log(quantity);
      alert("Quantidade de peças inválida.");
      return;
    }

    try {
      const endpoint = `/purchase-suggestions?quantity=${quantity}&classif=${selectedGroup}`;
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
    setSelectedGroup(event.target.value);
  }

  return (
    <ComponentContainer classToAdd="row-span-5 col-span-4">
      <CustomSubtitle
        subtitle="Gerar Sugestão"
        icon={<FilePenLine className="size-6" />}
      />
      <form className="w-full h-full grid grid-cols-6 gap-4">
        <div className="col-span-6">
          <label className="text-gray-200 text-sm font-medium">
            Selecione um Grupo:
          </label>
          <select
            className="w-full bg-gray-900 p-2 border-2 border-gray-800 text-gray-200 rounded"
            value={selectedGroup?.classif}
            onChange={handleChange}
          >
            <option value="">Nenhum grupo selecionado</option>
            {selectOptions?.map((option) => {
              return <option value={option.value}>{option.label}</option>;
            })}
          </select>
        </div>
        <div className="col-span-6">
          <CustomInput
            setValue={setQuantity}
            inputValue={quantity}
            label="Quantidade de Peças:"
            type="number"
            placeholder="50.000"
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
