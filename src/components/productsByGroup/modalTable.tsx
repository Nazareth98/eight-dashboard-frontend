import React, { Dispatch, useEffect, useState } from "react";
import Modal, { Styles } from "react-modal";
import { formatCurrency, sortTableData } from "../../utils/generalsUtils";
import { List, Table } from "lucide-react";
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
  const [chartData, setChartData] = useState<any[]>();

  useEffect(() => {
    if (modalData) {
      setChartData(modalData);
    }
  }, [modalData]);

  useEffect(() => {
    if (sortBy) {
      const sortedProviders = sortTableData([...modalData], sortBy, sortOrder);
      setChartData(sortedProviders);
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
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      {modalData && (
        <>
          <div className="w-full flex items-center gap-2">
            <Table className="size-6 text-gray-600" />
            <h3 className="text-2xl font-heading font-semibold text-gray-100">
              Todos os Grupos
            </h3>
          </div>
          <div className="w-full h-full overflow-y-auto flex flex-col gap-2">
            <table>
              <thead>
                <tr>
                  <th
                    onClick={() => handleSort("classif")}
                    className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300"
                  >
                    Grupo
                  </th>
                  <th
                    onClick={() => handleSort("description")}
                    className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300"
                  >
                    Descrição
                  </th>
                  <th
                    onClick={() => handleSort("saleValue")}
                    className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300"
                  >
                    Valor Venda
                  </th>
                  <th
                    onClick={() => handleSort("amount")}
                    className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300"
                  >
                    Quantidade
                  </th>
                </tr>
              </thead>
              <tbody>
                {chartData?.map((row) => (
                  <tr
                    key={`${row.classif}-${row.saleValue}`}
                    className="border border-gray-800"
                  >
                    <td className="px-4 py-2 text-sm text-gray-100 text-center">
                      {row.classif}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-100 text-center">
                      {row.description}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-100 text-center">
                      ${formatCurrency(row.saleValue)}
                    </td>

                    <td className="px-4 py-2 text-sm text-gray-100 text-center">
                      {row.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </Modal>
  );
};

export default ModalTable;
