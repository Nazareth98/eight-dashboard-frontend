import { createContext, useState } from "react";

import { getData } from "../services/API";
import ExchangerType from "../types/exchangerType";
import GroupType from "../types/groupType";
import ContactType from "../types/contactType";

interface ShootingContext {
  groupsData?: GroupType[];
  contactsData?: ContactType[];
  updateData: () => void;
}

const initialState: ShootingContext = {
  groupsData: undefined,
  contactsData: undefined,
  updateData: () => {},
};

const shootingContext = createContext<ShootingContext>(initialState);

const ShootingContextProvider = ({ children }: any) => {
  const [groupsData, setGroupsData] = useState<GroupType[]>();
  const [contactsData, setContactsData] = useState<ContactType[]>();

  async function getGroups() {
    try {
      const endpoint = "/chatbot/groups";
      const { result } = await getData(endpoint);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function getContacts() {
    try {
      const endpoint = "/chatbot/contacts";
      const { result } = await getData(endpoint);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateData() {
    try {
      const groupsResult = await getGroups();
      setGroupsData(groupsResult);
      const contactsResult = await getContacts();
      setContactsData(contactsResult);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <shootingContext.Provider value={{ contactsData, groupsData, updateData }}>
      {children}
    </shootingContext.Provider>
  );
};

export { shootingContext, ShootingContextProvider };
