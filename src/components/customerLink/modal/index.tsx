import { useContext, useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");

import CustomButton from "../../shared/customButton";
import IconEdit from "../../../assets/svg/iconEdit";
import CardIconInfo from "../../shared/cardIconInfo";
import IconUser from "../../../assets/svg/iconUser";
import IconPayments from "../../../assets/svg/iconPayments";
import ChatCard from "../../shared/card/chatCard";
import { dataContext } from "../../../contexts/dataContext";
import ContactType from "../../../types/contactType";
import GroupType from "../../../types/groupType";
import IconVerified from "../../../assets/svg/iconVerified";
import IconGroups from "../../../assets/svg/iconGroups";
import { putData } from "../../../services/API";
import { customerContext } from "../../../contexts/customerContext";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Cor do overlay
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    gap: "50px",
    alignItems: "center",
    padding: "40px",
    backgroundColor: "#1E1F1E",
    border: "none",
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    borderRadius: ".5rem",
  },
};

const ModalCustomerLink = (props) => {
  const { contactsData, groupsData } = useContext(dataContext);
  const { refreshData } = useContext(customerContext);

  const [groupOptions, setGroupOptions] = useState<GroupType[]>();
  const [contactOptions, setContactOptions] = useState<ContactType[]>();
  const [selectedContact, setSelectContact] = useState<ContactType>();
  const [selectedGroup, setSelectGroup] = useState<GroupType>();

  const resetSelection = () => {
    if (contactsData) {
      const updatedContacts = contactsData.map((contact) => {
        contact.isSelected = false;
        return contact;
      });

      setContactOptions(updatedContacts);
      setSelectContact(null);
    }

    if (groupsData) {
      const updatedGroups = groupsData.map((group) => {
        group.isSelected = false;
        return group;
      });

      setGroupOptions(updatedGroups);
      setSelectGroup(null);
    }
  };

  useState(() => {
    resetSelection();
  }, []);

  const handleSelectContact = ({ currentTarget }) => {
    const id = currentTarget.id;
    const updatedOptions = contactOptions?.map((contact) => {
      if (contact.id == id) {
        if (contact.isSelected) {
          contact.isSelected = false;
          setSelectContact(null);
        } else {
          contact.isSelected = true;
          setSelectContact(contact);
        }
      } else {
        contact.isSelected = false;
      }
      return contact;
    });

    setContactOptions(updatedOptions);
  };

  const handleSelectGroup = ({ currentTarget }) => {
    const id = currentTarget.id;
    const updatedOptions = groupOptions?.map((group) => {
      if (group.id == id) {
        if (group.isSelected) {
          group.isSelected = false;
          setSelectGroup(null);
        } else {
          group.isSelected = true;
          setSelectGroup(group);
        }
      } else {
        group.isSelected = false;
      }
      return group;
    });

    setGroupOptions(updatedOptions);
  };

  const closeModal = () => {
    resetSelection();
    props.setIsOpen(false);
  };

  const confirmLink = async () => {
    try {
      const endpoint = `/customer/${props.data.id}`;
      const data = {
        contact: selectedContact ? selectedContact : props.data.contact,
        group: selectedGroup ? selectedGroup : props.data.group,
      };
      const result = await putData(endpoint, data);
      refreshData();
      alert(result.message);
    } catch (error) {
      console.error(error);
    }
    closeModal();
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="w-full flex items-center gap-2">
        <IconEdit width="40px" fill="fill-primary-300" />

        <h3 className="font-heading font-semibold text-gray-50 text-3xl">
          Vincule os contatos de seu cliente
        </h3>
      </div>
      <div className="w-full flex items-center gap-8">
        <CardIconInfo
          label="Nome"
          data={props.data?.name}
          icon={<IconUser width="20px" fill="fill-primary-400" />}
        />
        <CardIconInfo
          label="SIGA ID"
          data={props.data?.sigaId}
          icon={<IconUser width="20px" fill="fill-primary-400" />}
        />
        <CardIconInfo
          label="Saldo"
          data={props.data?.balance}
          icon={<IconPayments width="20px" fill="fill-primary-400" />}
        />
        <CardIconInfo
          label="Grupo"
          icon={
            <IconGroups
              width="20px"
              fill={
                !props.data?.group ? "fill-primary-800" : "fill-primary-400"
              }
            />
          }
          data={props.data ? props.data?.group?.name : null}
          alternate={!props.data?.group}
        />
        <CardIconInfo
          label="Contato"
          icon={
            <IconGroups
              width="20px"
              fill={
                !props.data?.contact ? "fill-primary-800" : "fill-primary-400"
              }
            />
          }
          data={props.data ? props.data?.contact?.name : null}
          alternate={!props.data?.contact}
        />
      </div>
      <div className="w-full flex items-center justify-center gap-8 ">
        <div className="w-1/2 h-80 pr-2 overflow-y-auto flex flex-col gap-2">
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
        <div className="w-1/2 h-80 pr-2 overflow-y-auto flex flex-col gap-2">
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
      <div className="w-full flex items-center justify-center gap-8">
        <div className="w-1/2 flex items-center gap-1">
          {selectedGroup && (
            <>
              <IconVerified width="18px" fill="fill-gray-400" />
              <p className="text-gray-400 font-medium">Grupo selecionado</p>
            </>
          )}
        </div>
        <div className="w-1/2 flex items-center gap-1">
          {selectedContact && (
            <>
              <IconVerified width="18px" fill="fill-gray-400" />
              <p className="text-gray-400 font-medium">Contato selecionado</p>
            </>
          )}
        </div>
      </div>
      <div className="flex items center justify-center gap-8">
        <CustomButton type="danger" onClick={closeModal}>
          CANCELAR
        </CustomButton>
        <CustomButton onClick={confirmLink}>COFIRMAR</CustomButton>
      </div>
    </Modal>
  );
};

export default ModalCustomerLink;
