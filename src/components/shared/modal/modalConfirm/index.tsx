import Modal from "react-modal";
Modal.setAppElement("#root");

import IconWarning from "../../../../assets/svg/iconWarning";
import CustomButtom from "../../customButton";
import IconNotificationImportant from "../../../../assets/svg/iconNotificationImportant";
import IconBack from "../../../../assets/svg/iconBack";
import IconVerified from "../../../../assets/svg/iconVerified";

const ModalConfirm = (props) => {
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
      backgroundColor: "#131413",
      border: "none",
      boxShadow:
        "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      borderRadius: ".5rem",
    },
  };

  function closeModal() {
    props.setIsOpen(false);
  }

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="w-full flex items-center gap-2">
        <IconNotificationImportant width="30px" fill="fill-gray-800" />

        <h3 className="font-heading font-semibold text-gray-100 text-3xl">
          Ops!
        </h3>
      </div>
      <div className="bg-yellow-950 rounded p-2 border-2 border-yellow-300 flex items-center gap-2">
        <IconWarning fill="fill-yellow-500" />

        <p className="text-yellow-300">{props.message}</p>
      </div>
      <div className="flex items center justify-center gap-8">
        <CustomButtom theme="danger" onClick={closeModal}>
          <IconBack width="20px" fill="fill-red-700" />
          cancelar
        </CustomButtom>
        <CustomButtom
          onClick={() => {
            if (props.onConfirm) {
              props.onConfirm();
            }
            closeModal();
          }}
        >
          <IconVerified width="20px" fill="fill-primary-700" />
          confirmar
        </CustomButtom>
      </div>
    </Modal>
  );
};

export default ModalConfirm;
