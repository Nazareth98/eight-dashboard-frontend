import React, { useContext, useState } from "react";
import CustomSubtitle from "../shared/customSubtitle";
import IconShooting from "../../assets/svg/iconShooting";
import CustomInput from "../shared/customInput";
import CustomTextarea from "../shared/customTextarea";
import CustomButton from "../shared/customButton";
import IconClean from "../../assets/svg/iconClean";
import IconAdd from "../../assets/svg/iconAdd";
import { chatbotContext } from "../../contexts/chatbotContext";
import ModalWarning from "../shared/modal/modalWarning";

const ChatbotAddAccount = () => {
  const { addAccount } = useContext(chatbotContext);
  const [activeModal, setActiveModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [accountName, setAccountName] = useState<string>("");
  const [accountText, setAccountText] = useState<string>("");

  const handleAddAccount = async () => {
    if (!accountName) {
      setModalMessage("O nome da Conta é obrigatório.");
      setActiveModal(true);
      return;
    }
    if (!accountText) {
      setModalMessage("O texto da Conta é obrigatório.");
      setActiveModal(true);
      return;
    }
    await addAccount({ name: accountName, text: accountText, status: 0 });

    setAccountName("");
    setAccountText("");
  };

  const cleanFields = () => {
    setAccountName("");
    setAccountText("");
  };

  return (
    <div className="col-span-4 row-span-6 bg-gray-900 p-4 rounded-sm border-2 border-gray-800 flex flex-col gap-4">
      <ModalWarning
        isOpen={activeModal}
        setIsOpen={setActiveModal}
        message={modalMessage}
      />
      <CustomSubtitle
        icon={<IconShooting fill="fill-primary-400" width="25px" />}
        subtitle="Adicione uma Conta de Depósito"
      />
      <div className="w-full h-full flex flex-col  gap-4">
        <CustomInput
          placeholder="Veyron conta 1"
          label="Nome da Conta:"
          inputValue={accountName}
          setValue={setAccountName}
        />
        <CustomTextarea
          label="Texto da mensagem:"
          setValue={setAccountText}
          value={accountText}
          placeholder="Conta pix: ..."
          rows={8}
        />

        <div className="w-full h-full flex items-end justify-end self-end gap-4">
          <CustomButton type="attention" onClick={cleanFields}>
            <IconClean fill="fill-yellow-500" width="25px" />
            Limpar
          </CustomButton>
          <CustomButton onClick={handleAddAccount}>
            <IconAdd fill="fill-primary-400" width="25px" />
            Adicionar
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ChatbotAddAccount;
