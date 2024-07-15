import { useContext, useEffect, useState } from "react";
import CustomSubtitle from "../shared/customSubtitle";
import IconPhone from "../../assets/svg/iconPhone";
import IconContacts from "../../assets/svg/iconContacts";
import IconGroups from "../../assets/svg/iconGroups";
import IconExchange from "../../assets/svg/iconExchange";
import { chatbotContext } from "../../contexts/chatbotContext";
import RateType from "../../types/rateType";
import { formatCurrency } from "../../utils/generalsUtils";
import { contactsContext } from "../../contexts/contactsContext";
import CustomButton from "../shared/customButton";
import IconRefresh from "../../assets/svg/iconRefresh";

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

  const { activeAccount, currentRate, refreshData } =
    useContext(chatbotContext);
  const { contactData, groupData } = useContext(contactsContext);

  useEffect(() => {
    function updateData() {
      setContactAmount(contactData?.length);
      setGroupAmount(groupData?.length);
      setAccountData(activeAccount);
      setRate(currentRate);
    }

    updateData();
  }, [contactData, activeAccount, groupData, currentRate]);

  async function handleRefresh() {
    try {
      const result = await refreshData();
      alert(result.message);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="col-span-6 row-span-5 p-6 rounded-xl border-2 border-gray-900 flex flex-col gap-4 fade-left">
      <CustomSubtitle
        icon={<IconPhone fill="fill-gray-500" width="25px" />}
        subtitle="Dados do Chatbot"
      />

      <div className="h-full w-full flex gap-4 ">
        <div className="w-5/12 flex flex-col justify-center gap-4 fade-left">
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
                {rate ? formatCurrency(rate.value, "pt-BR", "BRL") : null}
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
          <div className="bg-gray-950 h-[100px] p-2 rounded border-2 border-gray-800 overflow-y-auto text-gray-200">
            {accountData && accountData.text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotData;
