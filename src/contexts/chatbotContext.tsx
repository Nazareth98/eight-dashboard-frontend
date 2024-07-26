import { createContext, useState } from "react";
import AccountType from "../types/accountType";
import { getData, postData, putData } from "../services/API";
import RateType from "../types/rateType";

interface ChatbotContext {
  rate: RateType;
  accounts: AccountType[];
  updateData: () => void;
  massShooting: (content: string) => void;
  updateAccount: (account: AccountType) => void;
  updateRate: (value: number) => void;
  syncData: () => void;
}
const initialState: ChatbotContext = {
  rate: undefined,
  accounts: [],
  updateData: () => {},
  massShooting: () => {},
  updateAccount: () => {},
  updateRate: () => {},
  syncData: () => {},
};

const chatbotContext = createContext<ChatbotContext>(initialState);

const ChatbotContextProvider = ({ children }: any) => {
  const [rate, setRate] = useState<RateType>();
  const [accounts, setAccounts] = useState<AccountType[]>();

  async function getRate() {
    try {
      const endpoint = "/chatbot/rate";
      const { result } = await getData(endpoint);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async function getAccounts() {
    try {
      const endpoint = "/chatbot/account";
      const { result } = await getData(endpoint);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async function updateData() {
    try {
      const updatedAccounts = await getAccounts();
      const updatedRate = await getRate();
      setRate(updatedRate);
      setAccounts(updatedAccounts);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async function massShooting(content: string) {
    // content: "rate", "account" or  "balance"
    try {
      const endpoint = `/chatbot/shooting-${content}`; //todo: mudar função nos disparos
      const result = await postData(endpoint, {});
      alert(result.message);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async function updateAccount(account: AccountType) {
    try {
      const id = account.id;
      const endpoint = `/chatbot/account/${id}`;
      const result = await putData(endpoint, account);
      await updateData();
      alert(result.message);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async function updateRate(value: number) {
    try {
      const endpoint = `/chatbot/rate`;
      await putData(endpoint, { value: Number(value) });
      const updatedRate = await getRate();
      setRate(updatedRate);
      alert("Taxa atualizada com sucesso!");
    } catch (error) {
      console.log(error);
    }
  }

  async function syncData() {
    try {
      const endpoint = `/chatbot/refresh-data`;
      const result = await getData(endpoint);
      alert(result.message);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  return (
    <chatbotContext.Provider
      value={{
        rate,
        accounts,
        updateData,
        massShooting,
        updateAccount,
        updateRate,
        syncData,
      }}
    >
      {children}
    </chatbotContext.Provider>
  );
};

export { chatbotContext, ChatbotContextProvider };
