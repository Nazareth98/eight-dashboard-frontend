import { useContext, useEffect, useState } from "react";
import IconBalance from "../../assets/svg/iconBalance";
import IconShooting from "../../assets/svg/iconShooting";
import CustomSubtitle from "../shared/customSubtitle";
import { chatbotContext } from "../../contexts/chatbotContext";
import AccountType from "../../types/accountType";
import ModalAccount from "./modal";
import IconEdit from "../../assets/svg/iconEdit";
import CustomButton from "../shared/customButton";

const ChatbotAccountList = () => {
  const [openActiveModal, setActiveModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<AccountType>();
  const [normalAccount, setNormalAccount] = useState<AccountType>();
  const [usdtAccount, setUsdtAccount] = useState<AccountType>();

  const { accountsData, updateAccount, getAccount } =
    useContext(chatbotContext);

  useEffect(() => {
    const updateAccounts = () => {
      const normalAccount = accountsData.filter(
        (account) => account.type === "NORMAL"
      );
      setNormalAccount(normalAccount[0]);
      const usdtAccount = accountsData.filter(
        (account) => account.type === "USDT"
      );
      setUsdtAccount(usdtAccount[0]);
    };

    if (accountsData) {
      updateAccounts();
    }
  }, [accountsData]);

  function handleActiveAccount(event) {
    const id = event.currentTarget.id;
    const selectAccount = accountsData.find(
      (account: AccountType) => account.id == id
    );

    setSelectedAccount(selectAccount);
    setActiveModal(true);
  }

  async function confirmActiveAccount(name: string, text: string) {
    try {
      selectedAccount.name = name;
      selectedAccount.text = text;
      const result = await updateAccount(selectedAccount);
      await getAccount();
      alert(result.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setActiveModal(false);
    }
  }

  return (
    <div className="col-span-3 col-start-10 bg-gray-900 p-6 rounded-xl border-2 border-gray-800 flex flex-col gap-4">
      <ModalAccount
        isOpen={openActiveModal}
        setIsOpen={setActiveModal}
        onConfirm={confirmActiveAccount}
        data={selectedAccount}
      />
      <CustomSubtitle
        icon={<IconShooting fill="fill-gray-500" width="25px" />}
        subtitle="Suas contas"
      />
      <span className="text-sm text-gray-200 font-medium">
        Clique em uma conta para editá-la
      </span>
      <div className="h-full flex flex-col justify-center gap-2">
        <div className="w-full flex items-center gap-4 pb-4 border-b border-gray-800">
          <div className="w-[30px]">
            <IconBalance fill="fill-primary-400" />
          </div>
          <div className="w-full">
            <h4 className="text-gray-100  font-heading font-medium">
              {normalAccount?.name}
            </h4>
          </div>

          <CustomButton id={normalAccount?.id} onClick={handleActiveAccount}>
            <IconEdit fill="fill-primary-700" width="25px" />
            editar
          </CustomButton>
        </div>
        <div className="w-full flex items-center gap-4 pb-4 border-b border-gray-800">
          <div className="w-[30px]">
            <IconBalance fill="fill-primary-400" />
          </div>
          <div className="w-full">
            <h4 className="text-gray-100  font-heading font-medium">
              {usdtAccount?.name}
            </h4>
          </div>
          <CustomButton id={usdtAccount?.id} onClick={handleActiveAccount}>
            <IconEdit fill="fill-primary-700" width="25px" />
            editar
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ChatbotAccountList;
