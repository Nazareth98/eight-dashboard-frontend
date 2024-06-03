import Modal from "react-modal";
import IconNotificationImportant from "../../../assets/svg/iconNotificationImportant";
import { useContext, useEffect, useState } from "react";
import CustomInput from "../../shared/customInput";
import CheckboxGroup from "../../shared/customCheckboxGroup";
import CustomButton from "../../shared/customButton";
import { userContext } from "../../../contexts/userContext";
Modal.setAppElement("#root");

const accessLevelOptions = [1, 2, 3];

const ModalEditUser = (props) => {
  const { updateUser } = useContext(userContext);

  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [accessLevel, setAccessLevel] = useState<number | null>(null);

  useEffect(() => {
    if (props.userData) {
      const user = props.userData;
      setName(user.name);
      setLastname(user.lastname);
      setEmail(user.email);
      setPhone(user.phone);
      setPosition(user.position);
      setAccessLevel(user.accessLevel);
    }
  }, [props]);

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
      gap: "30px",
      alignItems: "center",
      padding: "40px",
      backgroundColor: "#1E1F1E",
      border: "none",
      boxShadow:
        "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      borderRadius: ".5rem",
    },
  };

  function closeModal() {
    props.setIsOpen(false);
  }

  const handleLevelChange = (level) => {
    setAccessLevel(level);
  };

  async function handleConfirmEdit() {
    try {
      const body = {
        id: props.userData.id,
        name: name || props.userData.name,
        lastname: lastname || props.userData.lastname,
        email: email || props.userData.email,
        phone: phone || props.userData.phone,
        position: position || props.userData.position,
        accessLevel: accessLevel || props.userData.accessLevel,
        status: status || props.userData.status,
      };
      const response = await updateUser(body);
      alert(response.message);
    } catch (error) {
      alert(error.messsage);
    }
  }

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="w-full flex items-center gap-2">
        <IconNotificationImportant width="40px" fill="fill-primary-300" />

        <h3 className="font-heading font-semibold text-gray-50 text-3xl">
          {props.userData?.name}
        </h3>
      </div>
      <form className="flex flex-col gap-4 w-[30rem]">
        <CustomInput
          colSpan="2"
          placeholder="João"
          inputValue={name}
          setValue={setName}
          label="Nome:"
        />
        <CustomInput
          colSpan="2"
          placeholder="da Silva"
          inputValue={lastname}
          setValue={setLastname}
          label="Sobrenome:"
        />
        <CustomInput
          colSpan="2"
          placeholder="joao@eight.com"
          inputValue={email}
          setValue={setEmail}
          label="Email:"
        />
        <CustomInput
          colSpan="2"
          placeholder="(45) 99999-0000"
          inputValue={phone}
          setValue={setPhone}
          label="Telefone:"
        />
        <CustomInput
          colSpan="2"
          placeholder="Analista"
          inputValue={position}
          setValue={setPosition}
          label="Cargo:"
        />
        <CheckboxGroup
          colSpan="2"
          label="Nível de acesso:"
          options={accessLevelOptions}
          onChange={handleLevelChange}
        />
      </form>
      <div className="w-full flex items-center justify-end gap-8">
        <CustomButton type="danger" onClick={closeModal}>
          VOLTAR
        </CustomButton>
        <CustomButton onClick={handleConfirmEdit}>SALVAR</CustomButton>
      </div>
    </Modal>
  );
};

export default ModalEditUser;
