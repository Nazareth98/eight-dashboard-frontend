import { Search, Users } from "lucide-react";
import React, { Dispatch, useContext, useEffect, useState } from "react";
import { chatbotContext } from "../../contexts/chatbotContext";
import ContactType from "../../types/contactType";
import CustomCheckbox from "../shared/customCheckbox";
import CustomInput from "../shared/customInput";
import IconSearch from "../../assets/svg/iconSearch";

interface SelectContactsProps {
  selectContacts: ContactType[];
  setSelectContacts: Dispatch<React.SetStateAction<ContactType[]>>;
}

const SelectContacts = ({
  selectContacts,
  setSelectContacts,
}: SelectContactsProps) => {
  const { contacts } = useContext(chatbotContext);

  const [contactOptions, setContactOptions] = useState<ContactType[]>();

  const [isLoading, setIsLoading] = useState(true);
  const [allContactsChecked, setAllContactsChecked] = useState(false);
  const [inputContact, setInputContact] = useState("");

  useEffect(() => {
    if (contacts) {
      const updatedContacts = contacts.map((contact) => {
        contact.isSelected = false;
        return contact;
      });
      setContactOptions(updatedContacts);

      setTimeout(() => setIsLoading(false), 300);
    }
  }, [contacts]);

  function handleSelectContact({ currentTarget }) {
    const id = Number(currentTarget.id);
    const updatedContact = contactOptions?.map((contact) => {
      if (contact.id === id) {
        contact.isSelected = !contact.isSelected;

        if (contact.isSelected) {
          const updateSelectContacts = [...selectContacts, contact];
          setSelectContacts(updateSelectContacts);
        } else {
          const updateSelectContacts = selectContacts.filter(
            (contact) => contact.id !== id
          );
          setSelectContacts(updateSelectContacts);
        }
      }
      return contact;
    });
    setContactOptions(updatedContact);
  }

  function handleCheckAllContacts() {
    setAllContactsChecked(!allContactsChecked);

    const updatedContacts = contactOptions.map((contact) => {
      contact.isSelected = !allContactsChecked;
      return contact;
    });
    setContactOptions(updatedContacts);

    if (!allContactsChecked) {
      setSelectContacts(updatedContacts);
    } else {
      setSelectContacts([]);
    }
  }

  function handleSearchContact({ target }) {
    const inputText = target.value;
    setInputContact(inputText);

    const filteredContacts = contacts?.filter((contact) =>
      contact.name.toLowerCase().includes(inputText.toLowerCase())
    );

    setContactOptions(filteredContacts);
  }

  return (
    <>
      <div className="flex flex-col items-start gap-2">
        <CustomCheckbox
          label="Selecionar todos"
          checked={allContactsChecked}
          onChange={handleCheckAllContacts}
        />
        <CustomInput
          inputValue={inputContact}
          icon={<Search className="size-5 text-gray-700" />}
          placeholder="Pesquise por um Contato"
          onChange={handleSearchContact}
        />
      </div>

      <div className="h-full flex flex-col gap-2 overflow-y-auto">
        {contactOptions?.map((contact: ContactType) => {
          return (
            <div
              id={contact.id.toString()}
              onClick={handleSelectContact}
              key={contact.chatId}
              className={`flex items-center gap-2 border-l-4 border-2 border-gray-900  rounded p-2 cursor-pointer transition-all hover:bg-gray-900 active:bg-gray-950 fade-left ${
                contact.isSelected
                  ? "border-l-primary-400"
                  : "border-l-gray-600"
              }`}
            >
              <div>
                <Users
                  className={
                    contact.isSelected
                      ? "size-4 text-primary-400"
                      : "size-4 text-gray-600"
                  }
                />
              </div>
              <p className="text-gray-100 text-sm font-heading">
                {contact.name}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SelectContacts;
