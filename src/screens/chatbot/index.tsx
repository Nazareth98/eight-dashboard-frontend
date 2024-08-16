import { useContext, useEffect } from "react";

import ScreenContainer from "../../components/shared/screenContainer";
import ChatbotManager from "../../components/chatbotManager";
import MassShooting from "../../components/massShooting";
import { chatbotContext } from "../../contexts/chatbotContext";

const Chatbot = () => {
  const { updateContacts } = useContext(chatbotContext);

  useEffect(() => {
    const loadData = async () => {
      await updateContacts();
    };
    loadData();
  }, []);

  return (
    <ScreenContainer>
      <ChatbotManager />
      <MassShooting />
    </ScreenContainer>
  );
};

export default Chatbot;
