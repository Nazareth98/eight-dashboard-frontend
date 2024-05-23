import CustomSubtitle from "../shared/customSubtitle";
import IconShooting from "../../assets/svg/iconShooting";
import CustomButton from "../shared/customButton";
import IconExchange from "../../assets/svg/iconExchange";
import IconBalance from "../../assets/svg/iconBalance";
import { useContext } from "react";
import { chatbotContext } from "../../contexts/chatbotContext";
import IconRefresh from "../../assets/svg/iconRefresh";
import IconUser from "../../assets/svg/iconUser";
import IconPhone from "../../assets/svg/iconPhone";

const ChatbotShooting = () => {
  const { shootingRate, shootingAccount, refreshData } =
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

  return (
    <div className="col-span-3 col-start-10 bg-gray-900 p-6 rounded-xl border-2 border-gray-800 flex flex-col gap-4">
      <CustomSubtitle
        icon={<IconShooting fill="fill-gray-500" width="25px" />}
        subtitle="Gerenciamento"
      />

      <div className="w-full h-full flex flex-col  gap-4">
        <div className="w-full flex items-center gap-4 pb-4 border-b border-gray-800">
          <div className="w-[30px]">
            <IconExchange fill="fill-primary-400" />
          </div>
          <div className="w-full">
            <h4 className="text-gray-100  font-heading font-medium">Taxa</h4>
          </div>

          <CustomButton onClick={handleShootingRate} type="attention">
            <IconShooting fill="fill-yellow-600" width="25px" />
            enviar
          </CustomButton>
        </div>
        <div className="w-full flex items-center gap-4 pb-4 border-b border-gray-800">
          <div className="w-[30px]">
            <IconBalance fill="fill-primary-400" />
          </div>
          <div className="w-full">
            <h4 className="text-gray-100  font-heading font-medium">Conta</h4>
          </div>
          <CustomButton onClick={handleShootingAccount} type="attention">
            <IconShooting fill="fill-yellow-600" width="25px" />
            enviar
          </CustomButton>
        </div>
        <div className="w-full flex items-center gap-4 pb-4 border-b border-gray-800">
          <div className="w-[30px]">
            <IconPhone fill="fill-primary-400" />
          </div>
          <div className="w-full">
            <h4 className="text-gray-100  font-heading font-medium">Chatbot</h4>
          </div>
          <CustomButton onClick={handleRefresh}>
            <IconRefresh fill="fill-primary-700" width="25px" />
            atualizar
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ChatbotShooting;
