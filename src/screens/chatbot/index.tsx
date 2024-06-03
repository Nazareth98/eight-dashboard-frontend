import { useContext, useEffect } from "react";

import ScreenContainer from "../../components/shared/screenContainer";
import ChatbotData from "../../components/chatbotData";
import ChatbotQrcode from "../../components/chatbotQrcode";
import { chatbotContext } from "../../contexts/chatbotContext";
import { contactsContext } from "../../contexts/contactsContext";
import ChatbotManager from "../../components/chatbotManager";

const Chatbot = () => {
  const { setInitialData } = useContext(chatbotContext);
  const { updateData } = useContext(contactsContext);

  useEffect(() => {
    const loadData = async () => {
      await setInitialData();
      await updateData();
    };
    loadData();
  }, []);

  return (
    <ScreenContainer>
      <ChatbotData />
      <ChatbotQrcode />
      <ChatbotManager />
    </ScreenContainer>
  );
};

export default Chatbot;
