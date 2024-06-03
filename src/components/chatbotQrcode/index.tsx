import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

import CustomSubtitle from "../shared/customSubtitle";
import IconQrcode from "../../assets/svg/iconQrcode";
import IconVerified from "../../assets/svg/iconVerified";
import { getQrcode } from "../../services/API";

const ChatbotQrcode = () => {
  const [qrcode, setQrcode] = useState();

  useEffect(() => {
    const updateQrcode = async () => {
      try {
        const response = await getQrcode();
        console.log(response);
        if (response.result !== "Conectado!") {
          setQrcode(response.result);
          return false;
        } else {
          setQrcode(null);
          return true;
        }
      } catch (error) {
        console.error(error);
      }
    };

    updateQrcode();
    setInterval(updateQrcode, 5000);
  }, []);

  return (
    <div className="col-span-3 row-span-5 bg-gray-900 p-6 rounded-xl border border-gray-800 flex flex-col gap-4">
      <CustomSubtitle
        icon={<IconQrcode fill="fill-gray-500" width="25px" />}
        subtitle="Status da Conexão"
      />
      <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
        {qrcode ? (
          <div className="border-2 border-gray-800 p-2 bg-gray-600">
            <QRCode
              size={256}
              style={{ height: "16rem", width: "20rem" }}
              value={qrcode}
              viewBox={`0 0 256 256`}
            />
          </div>
        ) : (
          <>
            <IconVerified width="60px" fill="fill-primary-400" />
            <span className="text-gray-600 font-medium font-heading">
              Dispositivo conectado!
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatbotQrcode;
