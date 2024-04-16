// Arquivo: AuthContextProvider.js
import { createContext, useState } from "react";

import { getData, postData, putData } from "../services/API";
import RateType from "../types/rateType";
import GroupType from "../types/groupType";
import ContactType from "../types/contactType";
import AccountType from "../types/accountType";

interface ChatbotContext {
  currentRate: RateType | null;
  groupsData: GroupType[] | null;
  contactsData: ContactType[] | null;
  activeAccounts: AccountType | null;
}

const initialState: ChatbotContext = {
  currentRate: null,
  groupsData: null,
  contactsData: null,
  activeAccounts: null,
};

const chatbotContext = createContext<ChatbotContext>(initialState);

const ChatbotContextProvider = ({ children }: any) => {
  const [currentRate, setCurrentRate] = useState<RateType | null>();
  const [groupsData, setGroupsData] = useState<GroupType[] | null>();
  const [contactsData, setContactsData] = useState<GroupType[] | null>();
  const [accountsData, setAccountsData] = useState<AccountType[] | null>();
  const [activeAccount, setActiveAccount] = useState<AccountType | null>();

  const setInitialData = async () => {
    try {
      const accounts = await getAccount();
      const rate = await getRate();
      const endpoint = "/chatbot/refresh-data";
      const { result } = await getData(endpoint);
      console.log(accounts);
      setAccountsData(accounts);
      setCurrentRate(rate);
      setGroupsData(result.updateGroups);
      setContactsData(result.updateContacts);
    } catch (error) {
      console.log(error);
    }
  };

  const getRate = async () => {
    try {
      const endpoint = "/chatbot/rate";
      const { result } = await getData(endpoint);
      return result;
    } catch (error) {
      console.log(error);
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
    }
  };

  const shootingRate = async () => {
    try {
      const endpoint = "/chatbot/shooting-rate";
      const result = await postData(endpoint, {});
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const shootingAccount = async () => {
    try {
      const endpoint = "/chatbot/shooting-account";
      const result = await postData(endpoint, {});
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const updateActiveAccount = async (account: AccountType) => {
    try {
      const id = account.id;
      const endpoint = `/chatbot/account/${id}`;
      const result = await putData(endpoint, {});
      return result;
    } catch (error) {
      console.log(error);
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

  return (
    <chatbotContext.Provider
      value={{
        setInitialData,
        groupsData,
        contactsData,
        currentRate,
        accountsData,
        activeAccount,
        shootingRate,
        shootingAccount,
        getAccount,
        updateActiveAccount,
        addAccount,
        updateRate,
      }}
    >
      {children}
    </chatbotContext.Provider>
  );
};

export { chatbotContext, ChatbotContextProvider };
