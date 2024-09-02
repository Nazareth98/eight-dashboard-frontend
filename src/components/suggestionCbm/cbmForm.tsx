import React, { useEffect, useState } from "react";
import CustomInput from "../shared/customInput";
import CustomButton from "../shared/customButton";
import { Settings } from "lucide-react";
import { getData, postData } from "../../services/API";

interface OptionType {
  value: number | string;
  label: string;
}

interface GroupType {
  classif: string;
  description: string;
  quantityPerBox: number;
}

const CbmForm = ({ setCbmData }) => {
  const [groups, setGroups] = useState<GroupType[]>();
  const [selectOptions, setSelectOptions] = useState<OptionType[]>();

  // form states
  const [selectedGroup, setSelectedGroup] = useState<GroupType>();
  const [quantityPieces, setQuantityPieces] = useState<number>();
  const [quantityPerBox, setQuantityPerBox] = useState<number>();
  const [fob, setFob] = useState<number>();
  const [weight, setWeight] = useState<number>();
  const [height, setHeight] = useState<number>();
  const [width, setWidth] = useState<number>();
  const [depth, setDepth] = useState<number>();

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

  function handleChange(event) {
    const classif = event.target.value;
    const group = groups.find((group) => group.classif === classif);
    setQuantityPerBox(group.quantityPerBox);
    setSelectedGroup(group);
  }

  async function handleCalculateCbm() {
    try {
      if (!selectedGroup) throw new Error("Selecione um Grupo");
      if (!quantityPerBox) throw new Error("Insira quantidade por caixa");
      if (!quantityPieces) throw new Error("Insira quantidade total");
      if (!weight) throw new Error("Insira o peso da caixa");
      if (!height) throw new Error("Insira a altura da caixa");
      if (!width) throw new Error("Insira a largura da caixa");
      if (!depth) throw new Error("Insira a profundidade da caixa");

      const body = {
        classif: selectedGroup.classif,
        group: selectedGroup.description,
        quantityPieces: Number(quantityPieces),
        quantityPerBox: Number(quantityPerBox),
        fob: Number(fob),
        weight: Number(weight),
        height: Number(height),
        width: Number(width),
        depth: Number(depth),
      };
      console.log(body);
      const endpoint = "/purchase-suggestions/cbm";
      const response = await postData(endpoint, body);
      setCbmData(response.result);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className="w-full h-full grid grid-cols-6 gap-2 fade-left">
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
      <CustomInput
        type="number"
        inputValue={quantityPieces}
        setValue={setQuantityPieces}
        placeholder="10.000 un"
        label="Qtde. Peças:"
        colSpan="3"
      />
      <CustomInput
        type="number"
        inputValue={quantityPerBox}
        setValue={setQuantityPerBox}
        placeholder="100 un"
        label="Qtde. por Caixa"
        colSpan="3"
      />
      <CustomInput
        type="number"
        inputValue={fob}
        setValue={setFob}
        placeholder="$5,00"
        label="Custo FOB:"
        colSpan="3"
      />
      <CustomInput
        type="number"
        inputValue={weight}
        setValue={setWeight}
        placeholder="2,5kg"
        label="Peso (kg):"
        colSpan="3"
      />
      <CustomInput
        type="number"
        inputValue={height}
        setValue={setHeight}
        placeholder="50cm"
        label="Altura (cm):"
        colSpan="2"
      />
      <CustomInput
        type="number"
        inputValue={width}
        setValue={setWidth}
        placeholder="80cm"
        label="Comprimento (cm):"
        colSpan="2"
      />
      <CustomInput
        type="number"
        inputValue={depth}
        setValue={setDepth}
        placeholder="30cm"
        label="Profundidade: (cm)"
        colSpan="2"
      />
      <div className="col-span-6 flex justify-end">
        <CustomButton onClick={handleCalculateCbm}>
          <Settings className="size-4" />
          calcular
        </CustomButton>
      </div>
    </div>
  );
};

export default CbmForm;
