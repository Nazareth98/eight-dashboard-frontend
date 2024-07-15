import React, { useState } from "react";
import Modal from "react-modal";
import IconWarning from "../../../../assets/svg/iconWarning";
import CustomButtom from "../../customButton";
import IconNotificationImportant from "../../../../assets/svg/iconNotificationImportant";

const ModalWarning = (props) => {
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
        <IconNotificationImportant width="40px" fill="fill-primary-300" />

        <h3 className="font-heading font-semibold text-gray-50 text-3xl">
          Ops!
        </h3>
      </div>
      <div className="bg-yellow-950 rounded p-2 border-2 border-yellow-400 flex items-center gap-2">
        <IconWarning fill="fill-yellow-400" />
        <p className="text-yellow-400">{props.message}</p>
      </div>
      <div>
        <CustomButtom onClick={closeModal}>FECHAR</CustomButtom>
      </div>
    </Modal>
  );
};

export default ModalWarning;
