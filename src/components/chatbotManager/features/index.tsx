import {
  BotMessageSquare,
  CircleDollarSign,
  Edit,
  HandCoins,
  Landmark,
  RefreshCcw,
  Send,
  Settings2,
  Wallet,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { chatbotContext } from "../../../contexts/chatbotContext";
import AccountType from "../../../types/accountType";
import ModalAccount from "./modalAccount";
import FeatureButton from "./featureButton";

const Features = () => {
  const { updateAccount, massShooting, accounts, syncData } =
    useContext(chatbotContext);

  const [selectedAccount, setSelectedAccount] = useState<AccountType>();
  const [openAccountModal, setAccountModal] = useState(false);
  const [normalAccount, setNormalAccount] = useState<AccountType>();
  const [usdtAccount, setUsdtAccount] = useState<AccountType>();

  useEffect(() => {
    const updateAccounts = () => {
      const normalAccount = accounts.filter(
        (account) => account.type === "NORMAL"
      );
      setNormalAccount(normalAccount[0]);
      const usdtAccount = accounts.filter((account) => account.type === "USDT");
      setUsdtAccount(usdtAccount[0]);
    };

    if (accounts) {
      updateAccounts();
    }
  }, [accounts]);

  function handleActiveAccount(event) {
    const id = event.currentTarget.id;
    const selectAccount = accounts.find(
      (account: AccountType) => account.id == id
    );

    setSelectedAccount(selectAccount);
    setAccountModal(true);
  }

  async function handleShootingRate() {
    try {
      await massShooting("rate");
    } catch (error) {
      alert(error);
    }
  }

  async function handleShootingAccount() {
    try {
      await massShooting("account");
    } catch (error) {
      alert(error);
    }
  }

  async function handleShootingBalance() {
    try {
      await massShooting("balance");
    } catch (error) {
      alert(error);
    }
  }

  async function confirmActiveAccount(name: string, text: string) {
    try {
      selectedAccount.name = name;
      selectedAccount.text = text;
      await updateAccount(selectedAccount);
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setAccountModal(false);
    }
  }

  return (
    <div className="w-full h-full space-y-6">
      <ModalAccount
        isOpen={openAccountModal}
        setIsOpen={setAccountModal}
        onConfirm={confirmActiveAccount}
        data={selectedAccount}
      />
      <h3 className="text-gray-500 font-heading flex items-center gap-2">
        <Settings2 className="size-4" />
        Funcionalidades
      </h3>

      <div className="w-full h-full flex flex-col gap-5">
        <FeatureButton
          buttonText="enviar"
          label="Taxa"
          buttonTheme="attention"
          icon={<CircleDollarSign className="size-6" />}
          buttonIcon={<Send className="size-4" />}
          onClick={handleShootingRate}
        />
        <FeatureButton
          buttonText="enviar"
          label="Conta"
          buttonTheme="attention"
          icon={<Wallet className="size-6" />}
          buttonIcon={<Send className="size-4" />}
          onClick={handleShootingAccount}
        />
        <FeatureButton
          buttonText="enviar"
          label="Saldo"
          buttonTheme="attention"
          icon={<HandCoins className="size-6" />}
          buttonIcon={<Send className="size-4" />}
          onClick={handleShootingBalance}
        />
        <FeatureButton
          buttonText="atualizar"
          label="Chatbot"
          buttonTheme="alternate"
          icon={<BotMessageSquare className="size-6" />}
          buttonIcon={<RefreshCcw className="size-4" />}
          onClick={syncData}
        />
        <FeatureButton
          id={`${normalAccount?.id}`}
          buttonText="Editar"
          label="Conta Veyron"
          buttonTheme="alternate"
          icon={<Landmark className="size-6" />}
          buttonIcon={<Edit className="size-4" />}
          onClick={handleActiveAccount}
        />
        <FeatureButton
          id={`${usdtAccount?.id}`}
          buttonText="Editar"
          label="Conta Wallet"
          buttonTheme="alternate"
          icon={<Wallet className="size-6" />}
          buttonIcon={<Edit className="size-4" />}
          onClick={handleActiveAccount}
        />
      </div>
    </div>
  );
};

export default Features;
