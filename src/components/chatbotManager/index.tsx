import { CircleDollarSign, Settings, User2, Users2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { chatbotContext } from "../../contexts/chatbotContext";
import ComponentContainer from "../shared/componentContainer";
import CustomSubtitle from "../shared/customSubtitle";
import Connection from "./connection";
import Features from "./features";
import Rate from "./rate";

const ChatbotManager = () => {
  const { updateData, contacts, groups } = useContext(chatbotContext);

  const [contactAmount, setContactAmount] = useState<number>(0);
  const [groupAmount, setGroupAmount] = useState<number>(0);

  useEffect(() => {
    function loadData() {
      updateData();
      setContactAmount(contacts?.length);
      setGroupAmount(groups?.length);
    }

    loadData();
  }, [contacts, groups]);

  return (
    <ComponentContainer cols="3" rows="12">
      <CustomSubtitle
        icon={<Settings className="size-6" />}
        subtitle="Gerenciador"
      />

      <div className="w-full flex font-heading">
        <div className="w-full flex flex-col items-center">
          <div className="flex gap-2 items-center">
            <div>
              <Users2 className="size-7 text-gray-400" />
            </div>
            <h3 className="text-gray-100 text-2xl font-semibold">
              {groupAmount}
            </h3>
          </div>
          <h3 className="text-gray-500 font-heading flex items-center gap-2">
            Grupos
          </h3>
        </div>
        <div className="w-full flex flex-col items-center">
          <div className="flex gap-2 items-center">
            <div>
              <User2 className="size-7 text-gray-400" />
            </div>
            <h3 className="text-gray-100 text-2xl font-semibold">
              {contactAmount}
            </h3>
          </div>
          <h3 className="text-gray-500 font-heading flex items-center gap-2">
            Contatos
          </h3>
        </div>
      </div>
      <Rate />
      <Features />
      <Connection />
    </ComponentContainer>
  );
};

export default ChatbotManager;
