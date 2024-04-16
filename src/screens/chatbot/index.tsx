import ScreenContainer from "../../components/shared/screenContainer";
import ChatbotData from "../../components/chatbotData";
import ChatbotQrcode from "../../components/chatbotQrcode";
import ChatbotShooting from "../../components/chatbotShooting";
import ChatbotAccountList from "../../components/chatbotAccountList";

import ChatbotAddAccount from "../../components/chatbotAddAccount";
import ChatbotUpdateRate from "../../components/chatbotUpdateRate";
import { useContext, useEffect } from "react";
import { chatbotContext } from "../../contexts/chatbotContext";

const Chatbot = () => {
  const { setInitialData } = useContext(chatbotContext);

  useEffect(() => {
    const loadData = async () => {
      await setInitialData();
    };
    loadData();
  }, []);

  return (
    <ScreenContainer>
      <ChatbotData />
      <ChatbotQrcode />
      <ChatbotShooting />
      <ChatbotAccountList />
      <ChatbotAddAccount />
      <ChatbotUpdateRate />
    </ScreenContainer>
  );
};

export default Chatbot;
