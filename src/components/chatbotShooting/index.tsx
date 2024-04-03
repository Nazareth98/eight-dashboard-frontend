import CustomSubtitle from "../shared/customSubtitle";
import IconShooting from "../../assets/svg/iconShooting";
import CustomButton from "../shared/customButton";
import IconExchange from "../../assets/svg/iconExchange";
import IconBalance from "../../assets/svg/iconBalance";
import { useContext } from "react";
import { chatbotContext } from "../../contexts/chatbotContext";

const ChatbotShooting = () => {
  const { shootingRate, shootingAccount } = useContext(chatbotContext);

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

  return (
    <div className="col-span-3 row-span-3 bg-gray-900 p-4 rounded-sm border-2 border-gray-800 flex flex-col gap-4">
      <CustomSubtitle
        icon={<IconShooting fill="fill-primary-400" width="25px" />}
        subtitle="Disparos"
      />
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <CustomButton onClick={handleShootingRate} className="w-full">
          <IconExchange width="25px" fill="fill-primary-400" />
          Disparar TAXA
        </CustomButton>
        <CustomButton onClick={handleShootingAccount} className="w-full">
          <IconBalance width="25px" fill="fill-primary-400" />
          Disparar CONTA
        </CustomButton>
      </div>
    </div>
  );
};

export default ChatbotShooting;
