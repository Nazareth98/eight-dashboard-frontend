import React, { useContext, useState } from "react";
import CustomSubtitle from "../shared/customSubtitle";
import IconExchange from "../../assets/svg/iconExchange";
import CustomInput from "../shared/customInput";
import CustomButton from "../shared/customButton";
import IconClean from "../../assets/svg/iconClean";
import IconAdd from "../../assets/svg/iconAdd";
import { chatbotContext } from "../../contexts/chatbotContext";
import ModalWarning from "../shared/modal/modalWarning";

const ChatbotUpdateRate = () => {
  const { updateRate } = useContext(chatbotContext);
  const [activeModal, setActiveModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [rate, setRate] = useState<number>(0);

  const handleUpdateRate = async () => {
    if (!rate) {
      setModalMessage("O valor da Taxa é obrigatório.");
      setActiveModal(true);
      return;
    }
    await updateRate(rate);
    setRate(0);
    alert("Taxa atualizada com sucesso!");
  };

  return (
    <div className="col-span-3 row-span-3 bg-gray-900 p-4 rounded-sm border-2 border-gray-800 flex flex-col gap-4">
      <ModalWarning
        isOpen={activeModal}
        setIsOpen={setActiveModal}
        message={modalMessage}
      />
      <CustomSubtitle
        icon={<IconExchange fill="fill-primary-400" width="25px" />}
        subtitle="Atualize a Taxa"
      />
      <div className="w-full h-full flex flex-col gap-4">
        <CustomInput
          type="number"
          inputValue={rate}
          setValue={setRate}
          label="Valor da Taxa:"
        />
        <div className="w-full h-full flex items-end justify-end self-end gap-4">
          <CustomButton type="attention">
            <IconClean fill="fill-yellow-500" width="25px" />
            Limpar
          </CustomButton>
          <CustomButton onClick={handleUpdateRate}>
            <IconAdd fill="fill-primary-400" width="25px" />
            Atualizar
          </CustomButton>
        </div>
      </div>
    </div>
  );
};
export default ChatbotUpdateRate;
