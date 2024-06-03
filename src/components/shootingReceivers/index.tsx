import { useContext, useState } from "react";

import CustomSubtitle from "../shared/customSubtitle";
import IconGroups from "../../assets/svg/iconGroups";
import CustomCheckbox from "../shared/customCheckbox";
import { shootingContext } from "../../contexts/shootingContext";
import GroupType from "../../types/groupType";
import ContactType from "../../types/contactType";
import ChatCard from "../shared/card/chatCard";
import CustomInput from "../shared/customInput";
import IconSearch from "../../assets/svg/iconSearch";
import Loading from "../shared/loading";

const ShootingReceivers = ({
  setSelectContacts,
  setSelectGroups,
  selectContacts,
  selectGroups,
}) => {
  const { contactsData, groupsData } = useContext(shootingContext);

  const [isLoading, setIsLoading] = useState(true);

  const [allGroupsChecked, setAllGroupsChecked] = useState(false);
  const [allContactsChecked, setAllContactsChecked] = useState(false);

  const [groupOptions, setGroupOptions] = useState<GroupType[]>();
  const [contactOptions, setContactOptions] = useState<ContactType[]>();

  const [inputGroup, setInputGroup] = useState("");
  const [inputContact, setInputContact] = useState("");

  useState(() => {
    const resetSelection = () => {
      const updatedContacts = contactsData.map((contact) => {
        contact.isSelected = false;
        return contact;
      });
      setContactOptions(updatedContacts);

      const updatedGroups = groupsData.map((group) => {
        group.isSelected = false;
        return group;
      });
      setGroupOptions(updatedGroups);

      setTimeout(() => setIsLoading(false), 300);
    };

    if (contactsData && groupsData) {
      resetSelection();
    }
  }, []);

  function handleCheckAllGroups() {
    setAllGroupsChecked(!allGroupsChecked);

    const updatedGroups = groupOptions.map((group) => {
      group.isSelected = !allGroupsChecked;
      return group;
    });
    setGroupOptions(updatedGroups);

    if (!allGroupsChecked) {
      setSelectGroups(updatedGroups);
    } else {
      setSelectGroups([]);
    }
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

  function handleSelectGroup({ currentTarget }) {
    const id = Number(currentTarget.id);
    const updatedGroup = groupOptions?.map((group) => {
      if (group.id === id) {
        group.isSelected = !group.isSelected;

        if (group.isSelected) {
          const updateSelectGroups = [...selectGroups, group];
          setSelectGroups(updateSelectGroups);
          console.log(updateSelectGroups);
        } else {
          const updateSelectGroups = selectGroups.filter(
            (group) => group.id !== id
          );
          console.log(updateSelectGroups);
          setSelectGroups(updateSelectGroups);
        }
      }
      return group;
    });
    setGroupOptions(updatedGroup);
  }

  function handleSelectContact({ currentTarget }) {
    const id = Number(currentTarget.id);
    const updatedContact = contactOptions?.map((contact) => {
      if (contact.id === id) {
        contact.isSelected = !contact.isSelected;

        if (contact.isSelected) {
          const updateSelectContacts = [...selectContacts, contact];
          setSelectContacts(updateSelectContacts);
          console.log(updateSelectContacts);
        } else {
          const updateSelectContacts = selectContacts.filter(
            (contact) => contact.id !== id
          );
          console.log(updateSelectContacts);
          setSelectContacts(updateSelectContacts);
        }
      }
      return contact;
    });
    setContactOptions(updatedContact);
  }

  function handleSearchGroup({ target }) {
    const inputText = target.value;
    setInputGroup(inputText);

    const filteredGroups = groupsData?.filter((group) =>
      group.name.toLowerCase().includes(inputText.toLowerCase())
    );

    setGroupOptions(filteredGroups);
  }

  function handleSearchContact({ target }) {
    const inputText = target.value;
    setInputContact(inputText);

    const filteredContacts = contactsData?.filter((contact) =>
      contact.name.toLowerCase().includes(inputText.toLowerCase())
    );

    setContactOptions(filteredContacts);
  }

  return (
    <div className="h-[52rem] col-span-6 row-span-12 bg-gray-900 p-6 rounded-xl border-2 border-gray-800 flex flex-col gap-4">
      <CustomSubtitle
        icon={<IconGroups fill="fill-gray-500" width="25px" />}
        subtitle="Selecione os destinatários"
      />

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="w-full flex items-center gap-8">
            <CustomCheckbox
              label="Todos os Grupos"
              checked={allGroupsChecked}
              onChange={handleCheckAllGroups}
            />
            <CustomCheckbox
              label="Todos os Contatos"
              checked={allContactsChecked}
              onChange={handleCheckAllContacts}
            />
          </div>
          <div className="w-full flex items-center justify-center gap-8 ">
            <div className="w-1/2 flex flex-col gap-4">
              <CustomInput
                inputValue={inputGroup}
                icon={<IconSearch fill="fill-gray-600" />}
                placeholder="Pesquise por um Grupo"
                onChange={handleSearchGroup}
              />
              <div className="w-full h-[38rem] pr-2 overflow-y-auto flex flex-col gap-2">
                {groupOptions?.map((group: GroupType) => {
                  return (
                    <ChatCard
                      id={group.id}
                      checked={group.isSelected}
                      name={group.name}
                      onClick={handleSelectGroup}
                    />
                  );
                })}
              </div>
            </div>
            <div className="w-1/2 flex flex-col gap-4">
              <CustomInput
                inputValue={inputContact}
                icon={<IconSearch fill="fill-gray-600" />}
                placeholder="Pesquise por um Contato"
                onChange={handleSearchContact}
              />
              <div className="w-full h-[38rem] pr-2 overflow-y-auto flex flex-col gap-2">
                {contactOptions?.map((contact: ContactType) => {
                  return (
                    <ChatCard
                      id={contact.id}
                      checked={contact.isSelected}
                      name={contact.name}
                      onClick={handleSelectContact}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShootingReceivers;
