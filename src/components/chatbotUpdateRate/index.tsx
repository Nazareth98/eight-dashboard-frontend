import React, { useContext, useState } from "react";
import CustomSubtitle from "../shared/customSubtitle";
import IconExchange from "../../assets/svg/iconExchange";
import CustomInput from "../shared/customInput";
import CustomButton from "../shared/customButton";
import IconClean from "../../assets/svg/iconClean";
import IconAdd from "../../assets/svg/iconAdd";
import { chatbotContext } from "../../contexts/chatbotContext";
import ModalWarning from "../shared/modal/modalWarning";
import IconRefresh from "../../assets/svg/iconRefresh";
import { RefreshCcwDot, RefreshCw, RefreshCwOff } from "lucide-react";

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
    <div className="flex flex-col gap-4">
      <ModalWarning
        isOpen={activeModal}
        setIsOpen={setActiveModal}
        message={modalMessage}
      />
      <CustomSubtitle
        icon={<IconExchange fill="fill-gray-500" width="25px" />}
        subtitle="Atualize a Taxa"
      />

      <div className="w-full h-full flex flex-col items-end justify-center gap-4">
        <div className="w-full">
          <CustomInput
            type="number"
            inputValue={rate}
            setValue={setRate}
            label="Valor da Taxa:"
          />
        </div>
        <CustomButton onClick={handleUpdateRate}>
          <RefreshCw className="size-4" />
          atualizar
        </CustomButton>
      </div>
    </div>
  );
};
export default ChatbotUpdateRate;
