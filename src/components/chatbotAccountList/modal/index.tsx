import Modal from "react-modal";
import IconEdit from "../../../assets/svg/iconEdit";
import CustomButton from "../../shared/customButton";
import { useEffect, useState } from "react";
import CustomInput from "../../shared/customInput";
import CustomTextarea from "../../shared/customTextarea";
Modal.setAppElement("#root");

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

const ModalAccount = (props) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const closeModal = () => {
    props.setIsOpen(false);
  };

  useEffect(() => {
    function loadData() {
      setName(props.data.name);
      setText(props.data.text);
    }

    if (props.data) {
      loadData();
    }
  }, [props]);

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
          {props.data?.type}
        </h3>
      </div>

      <form className="flex flex-col gap-4 w-[30rem]">
        <CustomInput label="Nome" inputValue={name} setValue={setName} />
        <CustomTextarea
          label="Texto"
          value={text}
          setValue={setText}
          rows={8}
        />
      </form>

      <div className="w-full flex items-center justify-end gap-8">
        <CustomButton type="attention" onClick={closeModal}>
          VOLTAR
        </CustomButton>
        <CustomButton onClick={() => props.onConfirm(name, text)}>
          SALVAR
        </CustomButton>
      </div>
    </Modal>
  );
};

export default ModalAccount;
