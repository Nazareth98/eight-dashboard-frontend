import CustomSubtitle from "../shared/customSubtitle";
import IconQrcode from "../../assets/svg/iconQrcode";
import IconVerified from "../../assets/svg/iconVerified";

const ChatbotQrcode = () => {
  return (
    <div className="col-span-3 row-span-4 bg-gray-900 p-4 rounded-sm border-2 border-gray-800 flex flex-col gap-4">
      <CustomSubtitle
        icon={<IconQrcode fill="fill-primary-400" width="25px" />}
        subtitle="Status da Conexão"
      />
      <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
        <IconVerified width="60px" fill="fill-primary-400" />
        <span className="text-gray-600 font-medium font-heading">
          Dispositivo conectado!
        </span>
      </div>
    </div>
  );
};

export default ChatbotQrcode;
