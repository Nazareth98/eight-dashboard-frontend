import ScreenContainer from "../../components/shared/screenContainer";
import ChatbotData from "../../components/chatbotData";
import ChatbotQrcode from "../../components/chatbotQrcode";
import ChatbotShooting from "../../components/chatbotShooting";
import ChatbotAccountList from "../../components/chatbotAccountList";

import ChatbotUpdateRate from "../../components/chatbotUpdateRate";
import { useContext, useEffect } from "react";
import { chatbotContext } from "../../contexts/chatbotContext";
import { contactsContext } from "../../contexts/contactsContext";

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
      <ChatbotShooting />
      <ChatbotAccountList />
      <ChatbotUpdateRate />
    </ScreenContainer>
  );
};

export default Chatbot;
