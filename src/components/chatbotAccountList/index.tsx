import { useContext, useEffect, useState } from "react";
import IconBalance from "../../assets/svg/iconBalance";
import IconShooting from "../../assets/svg/iconShooting";
import CustomSubtitle from "../shared/customSubtitle";
import { dataContext } from "../../contexts/dataContext";
import AccountType from "../../types/accountType";
import ModalConfirm from "../shared/modal/modalConfirm";

function limitCharacterCount(text: string, limit: number): string {
  return text.length > limit ? text.slice(0, limit) + "..." : text;
}

const ChatbotAccountList = () => {
  const [openActiveModal, setActiveModal] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [selectedAccount, setSelectedAccount] = useState<AccountType>();
  const [accountsList, setAccountsList] = useState<AccountType[]>();
  const { accountsData, updateActiveAccount, getAccount } =
    useContext(dataContext);

  useEffect(() => {
    const updateAccounts = () => {
      setAccountsList(accountsData);
    };
    updateAccounts();
  }, [accountsData]);

  function handleActiveAccount(event) {
    const id = event.currentTarget.id;
    const selectAccount = accountsData.find(
      (account: AccountType) => account.id == id
    );

    setSelectedAccount(selectAccount);
    const message = `Deseja ativar a conta \n\n${selectAccount.name}?`;
    setConfirmMessage(message);
    setActiveModal(true);
  }

  async function confirmActiveAccount() {
    try {
      const result = await updateActiveAccount(selectedAccount);
      await getAccount();
      alert(result.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    setActiveModal(false);
  }

  return (
    <div className="col-span-3 row-span-8 bg-gray-900 p-4 rounded-sm border-2 border-gray-800 flex flex-col gap-4">
      <ModalConfirm
        isOpen={openActiveModal}
        setIsOpen={setActiveModal}
        message={confirmMessage}
        onConfirm={confirmActiveAccount}
      />
      <CustomSubtitle
        icon={<IconShooting fill="fill-primary-400" width="25px" />}
        subtitle="Suas contas"
      />
      <span className="text-sm text-gray-200 font-medium">
        Clique em uma conta para editá-la
      </span>
      <div className="flex flex-col gap-2 pr-2 overflow-y-auto">
        {accountsList?.map((item: AccountType, index) => (
          <div
            onClick={item.status == 1 ? () => "" : handleActiveAccount}
            key={index}
            id={item.id}
            className={`bg-gray-950 px-2 py-4 cursor-pointer border-2 rounded-lg grid grid-cols-6 items-center gap-4 transition ${
              item.status == 1 ? "border-primary-400" : "border-gray-800"
            }`}
          >
            <div
              className={`col-span-1 w-10 h-10 bg-primary-950 rounded-lg flex items-center justify-center border-2 ${
                item.status == 1 ? "border-primary-400" : "border-primary-900"
              }`}
            >
              <IconBalance
                width="25px"
                fill={
                  item.status == 1 ? "fill-primary-400" : "fill-primary-900"
                }
              />
            </div>
            <div className="col-span-4 ">
              <h3 className="text-xl text-gray-50 font-semibold font-heading">
                {limitCharacterCount(item.name, 14)}
              </h3>
              <span className="text-sm font-medium italic text-gray-600">
                {limitCharacterCount(item.text, 22)}
              </span>
            </div>
            <div className="col-span-1 w-8 h-full flex items-start justify-end">
              {item.status == 1 && (
                <span className="text-primary-400">ativo</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatbotAccountList;
