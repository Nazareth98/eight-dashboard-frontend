import { useContext, useEffect, useState } from "react";
import CustomSubtitle from "../shared/customSubtitle";
import IconPhone from "../../assets/svg/iconPhone";
import IconContacts from "../../assets/svg/iconContacts";
import IconGroups from "../../assets/svg/iconGroups";
import IconExchange from "../../assets/svg/iconExchange";
import { dataContext } from "../../contexts/dataContext";
import RateType from "../../types/rateType";

interface AccountDataType {
  id: number;
  name: string;
  text: string;
  status: number;
}

const ChatbotData = () => {
  const [contactAmount, setContactAmount] = useState<number>(0);
  const [groupAmount, setGroupAmount] = useState<number>(0);
  const [accountData, setAccountData] = useState<AccountDataType | null>(null);
  const [rate, setRate] = useState<RateType | null>(null);

  const { contactsData, groupsData, activeAccount, currentRate } =
    useContext(dataContext);

  useEffect(() => {
    function updateData() {
      setContactAmount(contactsData?.length);
      setGroupAmount(groupsData?.length);
      setAccountData(activeAccount);
      setRate(currentRate);
    }

    updateData();
  }, [contactsData, activeAccount, groupsData, currentRate]);

  function limitString(str, limite) {
    if (str.length > limite) {
      return str.substring(0, limite);
    } else {
      return str;
    }
  }

  return (
    <div className="col-span-6 row-span-4 bg-gray-900 p-4 rounded-sm border-2 border-gray-800 flex flex-col gap-4">
      <CustomSubtitle
        icon={<IconPhone fill="fill-primary-400" width="25px" />}
        subtitle="Dados do Chatbot"
      />
      <div className="h-full w-full flex gap-4 ">
        <div className="w-5/12 flex flex-col justify-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center bg-primary-950 border-2 border-primary-400 rounded-lg">
              <IconContacts fill="fill-primary-400" width="25px" />
            </div>
            <div>
              <span className="text-sm text-gray-200 font-medium">
                Contatos
              </span>
              <h2 className="text-2xl text-gray-50 font-semibold font-heading">
                {contactAmount}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center bg-primary-950 border-2 border-primary-400 rounded-lg">
              <IconGroups fill="fill-primary-400" width="25px" />
            </div>
            <div>
              <span className="text-sm text-gray-200 font-medium">Grupos</span>
              <h2 className="text-2xl text-gray-50 font-semibold font-heading">
                {groupAmount}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center bg-primary-950 border-2 border-primary-400 rounded-lg">
              <IconExchange fill="fill-primary-400" width="25px" />
            </div>
            <div>
              <span className="text-sm text-gray-200 font-medium">
                Taxa atual
              </span>
              <h2 className="text-2xl text-gray-50 font-semibold font-heading">
                R${rate?.value}
              </h2>
            </div>
          </div>
        </div>
        <div className="w-7/12 flex flex-col gap-4">
          <div>
            <span className="text-sm text-gray-200 font-medium">
              Conta ativa
            </span>
            <h2 className="text-2xl text-gray-50 font-semibold font-heading">
              {accountData?.name}
            </h2>
          </div>
          <p className="text-gray-600 italic">
            {accountData && limitString(accountData.text, 200)}...
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatbotData;
