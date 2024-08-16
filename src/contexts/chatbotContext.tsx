import { createContext, useState } from "react";
import AccountType from "../types/accountType";
import { getData, postData, putData } from "../services/API";
import RateType from "../types/rateType";
import ContactType from "../types/contactType";
import GroupType from "../types/groupType";

interface ChatbotContext {
  rate: RateType;
  accounts: AccountType[];
  contacts: ContactType[];
  groups: GroupType[];
  updateData: () => void;
  massShooting: (content: string, data?: any) => void;
  updateAccount: (account: AccountType) => void;
  updateRate: (value: number) => void;
  updateContacts: () => void;
  syncData: () => void;
}
const initialState: ChatbotContext = {
  rate: undefined,
  contacts: undefined,
  groups: undefined,
  accounts: [],
  updateData: () => {},
  massShooting: () => {},
  updateAccount: () => {},
  updateRate: () => {},
  updateContacts: () => {},
  syncData: () => {},
};

const chatbotContext = createContext<ChatbotContext>(initialState);

const ChatbotContextProvider = ({ children }: any) => {
  const [rate, setRate] = useState<RateType>();
  const [accounts, setAccounts] = useState<AccountType[]>();

  const [contacts, setContacts] = useState<ContactType[]>();
  const [groups, setGroups] = useState<GroupType[]>();

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

  async function massShooting(content: string, data?: any) {
    // content: "rate", "account", "balance" or "all"
    try {
      const body = data ? data : {};
      const endpoint = `/chatbot/shooting-${content}`;
      const result = await postData(endpoint, body);
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
  async function getGroups() {
    try {
      const endpoint = "/chatbot/groups";
      const { result } = await getData(endpoint);
      setGroups(result);
    } catch (error) {
      console.log(error);
    }
  }

  async function getContacts() {
    try {
      const endpoint = "/chatbot/contacts";
      const { result } = await getData(endpoint);
      setContacts(result);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateContacts() {
    try {
      await getGroups();
      await getContacts();
    } catch (error) {
      console.log(error);
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
        updateContacts,
        contacts,
        groups,
      }}
    >
      {children}
    </chatbotContext.Provider>
  );
};

export { chatbotContext, ChatbotContextProvider };
