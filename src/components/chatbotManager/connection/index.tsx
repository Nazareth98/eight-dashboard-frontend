import { Radio, Verified } from "lucide-react";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { getQrcode } from "../../../services/API";

const Connection = () => {
  const [qrcode, setQrcode] = useState();

  useEffect(() => {
    const updateQrcode = async () => {
      try {
        const response = await getQrcode();
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
    <div className="w-full space-y-6">
      <h3 className="text-gray-500 font-heading flex items-center gap-2">
        <Radio className="size-4" />
        Status da conexão
      </h3>
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
        <div className="bg-green-950 px-3 py-2 rounded flex items-center gap-2 text-green-600">
          <Verified className="size-5" />
          <span className="font-heading ">Conectado!</span>
        </div>
      )}
    </div>
  );
};

export default Connection;
