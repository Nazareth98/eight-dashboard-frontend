import CustomSubtitle from "../shared/customSubtitle";
import CustomButton from "../shared/customButton";
import IconExchange from "../../assets/svg/iconExchange";
import IconBalance from "../../assets/svg/iconBalance";
import { useContext } from "react";
import { chatbotContext } from "../../contexts/chatbotContext";
import IconPayments from "../../assets/svg/iconPayments";
import ChatbotAccountList from "../chatbotAccountList";
import ChatbotUpdateRate from "../chatbotUpdateRate";
import { Bot, RefreshCw, Send, Settings } from "lucide-react";

const ChatbotManager = () => {
  const { shootingRate, shootingAccount, refreshData, shootingBalance } =
    useContext(chatbotContext);

  const handleShootingRate = async () => {
    try {
      const result = await shootingRate();
      alert(result.message);
    } catch (error) {
      alert(error);
    }
  };

  const handleShootingAccount = async () => {
    try {
      const result = await shootingAccount();
      alert(result.message);
    } catch (error) {
      alert(error);
    }
  };

  async function handleRefresh() {
    try {
      const result = await refreshData();
      alert(result.message);
    } catch (error) {
      alert(error);
    }
  }

  async function handleShootingBalance() {
    try {
      const result = await shootingBalance();
      alert(result.message);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="col-span-3 row-span-12 col-start-10 p-6 rounded-xl border-2 border-gray-900 flex flex-col justify-between gap-8 fade-left">
      <div className="w-full flex flex-col items-between gap-4">
        <CustomSubtitle
          icon={<Settings className="size-6 text-gray-500" />}
          subtitle="Gerenciamento"
        />
        <div className="w-full flex items-center gap-4 pb-4 border-b-2 border-gray-900">
          <div className="w-[30px]">
            <IconExchange fill="fill-primary-800" width="25px" />
          </div>
          <div className="w-full">
            <h4 className="text-gray-100  font-heading font-medium">Taxa</h4>
          </div>

          <CustomButton onClick={handleShootingRate} theme="attention">
            <Send className="size-4" />
            enviar
          </CustomButton>
        </div>
        <div className="w-full flex items-center gap-4 pb-4 border-b-2 border-gray-900">
          <div className="w-[30px]">
            <IconBalance fill="fill-primary-800" width="25px" />
          </div>
          <div className="w-full">
            <h4 className="text-gray-100  font-heading font-medium">Conta</h4>
          </div>
          <CustomButton onClick={handleShootingAccount} theme="attention">
            <Send className="size-4" />
            enviar
          </CustomButton>
        </div>
        <div className="w-full flex items-center gap-4 pb-4 border-b-2 border-gray-900">
          <div className="w-[30px]">
            <IconPayments fill="fill-primary-800" width="25px" />
          </div>
          <div className="w-full">
            <h4 className="text-gray-100  font-heading font-medium">Saldo</h4>
          </div>
          <CustomButton onClick={handleShootingBalance} theme="attention">
            <Send className="size-4" />
            enviar
          </CustomButton>
        </div>
        <div className="w-full flex items-center gap-4 pb-4 border-b-2 border-gray-900">
          <div className="w-[30px]">
            <Bot className="size-6 text-primary-800" />
          </div>
          <div className="w-full">
            <h4 className="text-gray-100  font-heading font-medium">Chatbot</h4>
          </div>
          <CustomButton onClick={handleRefresh} theme="alternate">
            <RefreshCw className="size-4" />
            atualizar
          </CustomButton>
        </div>
      </div>
      <ChatbotAccountList />
      <ChatbotUpdateRate />
    </div>
  );
};

export default ChatbotManager;
