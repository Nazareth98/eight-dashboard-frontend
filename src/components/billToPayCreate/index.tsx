import React, { useContext, useState } from "react";
import CustomSubtitle from "../shared/customSubtitle";
import IconAdd from "../../assets/svg/iconAdd";
import CustomInput from "../shared/customInput";
import CustomButton from "../shared/customButton";
import IconClean from "../../assets/svg/iconClean";
import { billToPayContext } from "../../contexts/billToPayContext";

const BillToPayCreate = () => {
  const { createBillToPay } = useContext(billToPayContext);

  const [name, setName] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [value, setValue] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [repetitions, setRepetitions] = useState<number>(0);

  async function handleCreateBill() {
    if (!name) {
      alert("O campo Nome é obrigatório!");
      return;
    }
    if (!dueDate) {
      alert("O campo Vencimento é obrigatório!");
      return;
    }
    if (!value) {
      alert("O campo Valor é obrigatório!");
      return;
    }
    if (!description) {
      alert("O campo Descrição é obrigatório!");
      return;
    }

    try {
      const body = {
        name,
        dueDate,
        value: Number(value),
        description,
        repetitions: repetitions > 1 ? repetitions : 1,
      };
      console.log(body);
      const response = await createBillToPay(body);
      alert(response.message);
      cleanFields();
    } catch (error) {
      alert(error.message);
    }
  }

  function cleanFields() {
    setName("");
    setDueDate("");
    setValue(0);
    setDescription("");
    setRepetitions(0);
  }

  return (
    <div className="col-span-4 row-span-8 row-start-3 col-start-9 bg-gray-900 p-4 rounded-sm border-2 border-gray-800 flex flex-col gap-4">
      <CustomSubtitle
        icon={<IconAdd fill="fill-primary-400" width="25px" />}
        subtitle="Adiciona Conta à Pagar"
      />
      <form className="w-full flex flex-col gap-4">
        <CustomInput
          placeholder="Patrick Bot"
          inputValue={name}
          setValue={setName}
          label="Nome:"
        />
        <CustomInput
          type="number"
          placeholder="1000"
          inputValue={value}
          setValue={setValue}
          label="Valor:"
        />
        <CustomInput
          type="date"
          placeholder="João"
          inputValue={dueDate}
          setValue={setDueDate}
          label="Vencimento:"
        />
        <CustomInput
          placeholder="Mensalidade"
          inputValue={description}
          setValue={setDescription}
          label="Descrição:"
        />
        <CustomInput
          type="number"
          placeholder="12"
          inputValue={repetitions}
          setValue={setRepetitions}
          label="Repetir lançamento:"
        />
      </form>
      <div className="h-full w-full flex items-end justify-end gap-4">
        <CustomButton type="attention" onClick={cleanFields}>
          <IconClean fill="fill-yellow-500" width="25px" />
          LIMPAR
        </CustomButton>
        <CustomButton onClick={handleCreateBill}>
          <IconAdd fill="fill-primary-400" width="25px" />
          ADICIONAR
        </CustomButton>
      </div>
    </div>
  );
};

export default BillToPayCreate;
