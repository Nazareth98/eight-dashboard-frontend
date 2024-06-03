import { createContext, useState } from "react";

import { getData, postData, putData } from "../services/API";
import RateType from "../types/rateType";
import AccountType from "../types/accountType";

interface ChatbotContext {
  currentRate: RateType | null;
  activeAccounts: AccountType | null;
}

const initialState: ChatbotContext = {
  currentRate: null,
  activeAccounts: null,
};

const chatbotContext = createContext<ChatbotContext>(initialState);

const ChatbotContextProvider = ({ children }: any) => {
  const [currentRate, setCurrentRate] = useState<RateType | null>();
  const [accountsData, setAccountsData] = useState<AccountType[] | null>();
  const [activeAccount, setActiveAccount] = useState<AccountType | null>();

  const setInitialData = async () => {
    try {
      const accounts = await getAccount();
      const rate = await getRate();
      setAccountsData(accounts);
      setCurrentRate(rate);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  const getRate = async () => {
    try {
      const endpoint = "/chatbot/rate";
      const { result } = await getData(endpoint);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  const getAccount = async () => {
    try {
      const endpoint = "/chatbot/account";
      const { result } = await getData(endpoint);
      const activeResult = result.filter(
        (account: AccountType) => account.status === 1
      );
      setActiveAccount(activeResult[0]);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  const shootingRate = async () => {
    try {
      const endpoint = "/chatbot/shooting-rate";
      const result = await postData(endpoint, {});
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  const shootingBalance = async () => {
    try {
      const endpoint = "/chatbot/shooting-balance";
      const result = await postData(endpoint, {});
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  const shootingAccount = async () => {
    try {
      const endpoint = "/chatbot/shooting-account";
      const result = await postData(endpoint, {});
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  const updateAccount = async (account: AccountType) => {
    try {
      const id = account.id;
      const endpoint = `/chatbot/account/${id}`;
      const result = await putData(endpoint, account);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  const addAccount = async (data: AccountType) => {
    try {
      const endpoint = `/chatbot/account`;
      const result = await postData(endpoint, data);
      const updatedAccounts = await getAccount();
      setAccountsData(updatedAccounts);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  const updateRate = async (value: number) => {
    try {
      const endpoint = `/chatbot/rate`;
      const result = await putData(endpoint, { value: Number(value) });
      const updatedRate = await getRate();
      setCurrentRate(updatedRate);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const refreshData = async () => {
    try {
      const endpoint = `/chatbot/refresh-data`;
      const result = await getData(endpoint);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  return (
    <chatbotContext.Provider
      value={{
        setInitialData,
        refreshData,
        currentRate,
        accountsData,
        activeAccount,
        shootingRate,
        shootingAccount,
        getAccount,
        updateAccount,
        addAccount,
        updateRate,
        shootingBalance,
      }}
    >
      {children}
    </chatbotContext.Provider>
  );
};

export { chatbotContext, ChatbotContextProvider };
