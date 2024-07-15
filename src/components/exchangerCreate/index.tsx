import { useContext, useState } from "react";
import { exchangerContext } from "../../contexts/exchangerContext";
import ModalWarning from "../shared/modal/modalWarning";
import CustomSubtitle from "../shared/customSubtitle";
import IconAdd from "../../assets/svg/iconAdd";
import CustomInput from "../shared/customInput";
import CustomButton from "../shared/customButton";
import IconClean from "../../assets/svg/iconClean";
import ExchangerType from "../../types/exchangerType";

const ExchangerCreate = () => {
  const { createExchanger } = useContext(exchangerContext);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalWarning, setModalWarning] = useState("");

  const [name, setName] = useState<string>("");
  const [balance, setBalance] = useState<number>();

  function cleanFields() {
    setName("");
    setBalance(undefined);
  }

  async function handleCreateExchager() {
    try {
      const body: ExchangerType = {
        name,
        balance: Number(balance),
      };
      const result = await createExchanger(body);
      if (result.status !== 200) {
        setModalWarning(result.message);
        setModalIsOpen(true);
      } else {
        cleanFields();
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="col-span-4 row-span-4 bg-gray-900 p-4 rounded-sm border-2 border-gray-800 flex flex-col gap-4">
      <ModalWarning
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        message={modalWarning}
      />
      <CustomSubtitle
        icon={<IconAdd fill="fill-primary-400" width="25px" />}
        subtitle="Criar Novo Cambista"
      />
      <form className="w-full flex flex-col gap-4">
        <CustomInput
          colSpan="2"
          placeholder="João"
          inputValue={name}
          setValue={setName}
          label="Nome:"
        />
        <CustomInput
          colSpan="2"
          type="number"
          placeholder="da Silva"
          inputValue={balance}
          setValue={setBalance}
          label="Saldo inicial:"
        />
      </form>
      <div className="h-full w-full flex items-end justify-end gap-4">
        <CustomButton theme="attention" onClick={cleanFields}>
          <IconClean fill="fill-yellow-500" width="25px" />
          Limpar
        </CustomButton>
        <CustomButton onClick={handleCreateExchager}>
          <IconAdd fill="fill-primary-400" width="25px" />
          Adicionar
        </CustomButton>
      </div>
    </div>
  );
};

export default ExchangerCreate;
