import { createContext, useState } from "react";

import { getData } from "../services/API";
import ContactType from "../types/contactType";
import GroupType from "../types/groupType";

interface ContactsContext {
  contactData?: ContactType[];
  groupData?: GroupType[];
  updateData: () => void;
}

const initialState: ContactsContext = {
  contactData: undefined,
  groupData: undefined,
  updateData: () => {},
};

const contactsContext = createContext<ContactsContext>(initialState);

const ContactsContextProvider = ({ children }: any) => {
  const [contactData, setContactData] = useState<ContactType[]>();
  const [groupData, setGroupData] = useState<GroupType[]>();

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
      const groupResult = await getGroups();
      setGroupData(groupResult);
      const contactResult = await getContacts();
      setContactData(contactResult);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <contactsContext.Provider value={{ updateData, groupData, contactData }}>
      {children}
    </contactsContext.Provider>
  );
};

export { contactsContext, ContactsContextProvider };
