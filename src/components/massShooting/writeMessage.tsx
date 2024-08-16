import React, { useContext, useState } from "react";
import CustomTextarea from "../shared/customTextarea";
import CustomButton from "../shared/customButton";
import { Send } from "lucide-react";
import { chatbotContext } from "../../contexts/chatbotContext";

const WriteMessage = ({ selectContacts, selectGroups }) => {
  const [text, setText] = useState<string>();
  const { massShooting } = useContext(chatbotContext);

  async function handleShooting() {
    if (!text) {
      alert("É necessário escrever uma mensagem.");
      return;
    }

    if (selectContacts.length < 1 && selectGroups.length < 1) {
      alert("É necessário selecionar ao menos 1 destinatário.");
      return;
    }

    const body = {
      text,
      receivers: [...selectContacts, ...selectGroups],
    };
    await massShooting("all", body);
  }

  return (
    <>
      <CustomTextarea
        label="Mensagem:"
        placeholder="Bom dia, informamos que..."
        value={text}
        setValue={setText}
        rows={6}
      />

      <div className="h-full w-full flex items-end justify-end">
        <CustomButton onClick={handleShooting}>
          <Send className="size-4" />
          enviar
        </CustomButton>
      </div>
    </>
  );
};

export default WriteMessage;
