import { useContext, useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");

import CustomButton from "../../shared/customButton";
import IconEdit from "../../../assets/svg/iconEdit";
import CardIconInfo from "../../shared/cardIconInfo";
import IconUser from "../../../assets/svg/iconUser";
import IconPayments from "../../../assets/svg/iconPayments";
import ChatCard from "../../shared/card/chatCard";
import ContactType from "../../../types/contactType";
import GroupType from "../../../types/groupType";
import IconVerified from "../../../assets/svg/iconVerified";
import IconGroups from "../../../assets/svg/iconGroups";
import { putData } from "../../../services/API";
import { customerContext } from "../../../contexts/customerContext";
import CustomInput from "../../shared/customInput";
import IconSearch from "../../../assets/svg/iconSearch";
import CustomCheckbox from "../../shared/customCheckbox";
import { contactsContext } from "../../../contexts/contactsContext";
import { ArrowLeft, Link, Save, UserCircle } from "lucide-react";

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
  const { contactData, groupData } = useContext(contactsContext);
  const { getCustomers } = useContext(customerContext);

  const [groupOptions, setGroupOptions] = useState<GroupType[]>();
  const [contactOptions, setContactOptions] = useState<ContactType[]>();

  const [selectedContact, setSelectContact] = useState<ContactType>();
  const [selectedGroup, setSelectGroup] = useState<GroupType>();

  const [inputGroup, setInputGroup] = useState("");
  const [inputContact, setInputContact] = useState("");

  const [deleteContact, setDeleteContact] = useState(false);
  const [deleteGroup, setDeleteGroup] = useState(false);

  const resetSelection = () => {
    if (contactData) {
      const updatedContacts = contactData.map((contact) => {
        contact.isSelected = false;
        return contact;
      });

      setContactOptions(updatedContacts);
      setSelectContact(null);
    }

    if (groupData) {
      const updatedGroups = groupData.map((group) => {
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
        contact: selectedContact
          ? selectedContact
          : deleteContact
          ? null
          : props.data.contact,
        group: selectedGroup
          ? selectedGroup
          : deleteGroup
          ? null
          : props.data.group,
      };
      const result = await putData(endpoint, data);
      await getCustomers();
      alert(result.message);
    } catch (error) {
      console.error(error);
    }
    closeModal();
  };

  const handleChangeGroup = (e) => {
    const textoDigitado = e.target.value;
    setInputGroup(textoDigitado);

    const resultadosFiltrados = groupData?.filter((group) => {
      return group.name.toLowerCase().includes(textoDigitado.toLowerCase());
    });

    setGroupOptions(resultadosFiltrados);
  };

  const handleChangeContact = (e) => {
    const textoDigitado = e.target.value;
    setInputContact(textoDigitado);

    const resultadosFiltrados = contactData?.filter((contact) =>
      contact.name.toLowerCase().includes(textoDigitado.toLowerCase())
    );

    setContactOptions(resultadosFiltrados);
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="w-full flex transition-all items-center gap-2">
        <IconEdit width="40px" fill="fill-primary-300" />

        <h3 className="font-heading font-semibold text-gray-50 text-3xl">
          Vincule os contatos de seu cliente
        </h3>
      </div>
      <div className="w-full">
        <CardIconInfo
          label="Nome"
          data={props.data?.name}
          icon={<UserCircle className="size-5" />}
        />
      </div>
      <div className="w-full flex items-center gap-8">
        <CustomCheckbox
          label="Remover vínculo com grupo"
          checked={deleteGroup}
          setChecked={setDeleteGroup}
        />
        <CustomCheckbox
          label="Remover vínculo com contato"
          checked={deleteContact}
          setChecked={setDeleteContact}
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-8 ">
        <div className="w-full flex items-center justify-center gap-8 ">
          {!deleteGroup && (
            <div className="w-full">
              <CustomInput
                inputValue={inputGroup}
                onChange={handleChangeGroup}
                placeholder="Pesquise por um Grupo"
                icon={<IconSearch width="25px" fill="fill-gray-600" />}
              />
            </div>
          )}
          {!deleteContact && (
            <div className="w-full">
              <CustomInput
                inputValue={inputContact}
                onChange={handleChangeContact}
                placeholder="Pesquise por um Contato"
                icon={<IconSearch width="25px" fill="fill-gray-600" />}
              />
            </div>
          )}
        </div>
        <div className="w-full flex items-center justify-center gap-8 ">
          {!deleteGroup && (
            <div className="w-full h-80 pr-2 overflow-y-auto flex flex-col gap-2">
              {groupOptions?.map((group: GroupType) => {
                return (
                  <ChatCard
                    key={group.id}
                    id={group.id}
                    checked={group.isSelected}
                    name={group.name}
                    onClick={handleSelectGroup}
                  />
                );
              })}
            </div>
          )}
          {!deleteContact && (
            <div className="w-full h-80 pr-2 overflow-y-auto flex flex-col gap-2">
              {contactOptions?.map((contact: ContactType) => {
                return (
                  <ChatCard
                    key={contact.id}
                    id={contact.id}
                    checked={contact.isSelected}
                    name={contact.name}
                    onClick={handleSelectContact}
                  />
                );
              })}
            </div>
          )}
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
        <CustomButton theme="danger" onClick={closeModal}>
          <ArrowLeft className="size-4" />
          cancelar
        </CustomButton>
        <CustomButton onClick={confirmLink}>
          <Save className="size-4" />
          confirmar
        </CustomButton>
      </div>
    </Modal>
  );
};

export default ModalCustomerLink;
