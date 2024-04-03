import Modal from "react-modal";
import IconEdit from "../../../assets/svg/iconEdit";
import CustomButton from "../../shared/customButton";
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
  const closeModal = () => {
    props.setIsOpen(false);
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
          {props.data?.name}
        </h3>
      </div>
      <div className="w-full flex flex-col gap-4">
        <span className="font-medium text-gray-50">Texto:</span>
        <p className="max-w-80 text-gray-300">{props.data?.text}</p>
      </div>
      <div className="flex items center justify-center gap-8">
        <CustomButton type="attention" onClick={closeModal}>
          VOLTAR
        </CustomButton>
        <CustomButton type="danger" onClick={props.onDelete}>
          EXCLUIR
        </CustomButton>
        <CustomButton onClick={props.onConfirm}>ATIVAR</CustomButton>
      </div>
    </Modal>
  );
};

export default ModalAccount;
