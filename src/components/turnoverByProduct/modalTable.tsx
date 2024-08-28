import React, { Dispatch, useEffect, useState } from "react";
import Modal, { Styles } from "react-modal";
import { sortTableData } from "../../utils/generalsUtils";
Modal.setAppElement("#root");

const customStyles: Styles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: "100",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    maxHeight: "90vh",
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
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    borderRadius: ".5rem",
    zIndex: "101",
  },
};

interface ModalTableProps {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  modalData: any[];
}

const ModalTable = ({ setIsOpen, isOpen, modalData }: ModalTableProps) => {
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [tableData, setTableData] = useState<any[]>();

  useEffect(() => {
    if (modalData) {
      setTableData(modalData);
    }
  }, [modalData]);

  useEffect(() => {
    if (sortBy) {
      const sortedProviders = sortTableData([...modalData], sortBy, sortOrder);
      setTableData(sortedProviders);
    }
  }, [sortBy, sortOrder]);

  function closeModal() {
    setIsOpen(false);
  }

  function handleSort(columnName) {
    if (sortBy === columnName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(columnName);
      setSortOrder("asc");
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
    ></Modal>
  );
};

export default ModalTable;
