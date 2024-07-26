import { useContext, useEffect } from "react";

import ScreenContainer from "../../components/shared/screenContainer";
import ChatbotManager from "../../components/chatbotManager";
import { chatbotContext } from "../../contexts/chatbotContext";
import { contactsContext } from "../../contexts/contactsContext";

const Chatbot = () => {
  const { updateData } = useContext(contactsContext);

  useEffect(() => {
    const loadData = async () => {
      await updateData();
    };
    loadData();
  }, []);

  return (
    <ScreenContainer>
      <ChatbotManager />
    </ScreenContainer>
  );
};

export default Chatbot;
