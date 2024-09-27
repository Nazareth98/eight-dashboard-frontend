import React, { Dispatch, useEffect, useState } from "react";
import Modal, { Styles } from "react-modal";
import { formatCurrency, sortTableData } from "../../utils/generalsUtils";
import { Table } from "lucide-react";
import { InventoryTurnoverDataType } from "../../contexts/InventoryTurnoverContext";
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
  const [tableData, setTableData] = useState<InventoryTurnoverDataType[]>();

  useEffect(() => {
    if (modalData) {
      setTableData(modalData);
    }
  }, [modalData]);

  useEffect(() => {
    if (sortBy) {
      setTableData([]);
      const sortedTableData = sortTableData([...tableData], sortBy, sortOrder);
      setTableData(sortedTableData);
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
      <>
        <div className="w-full flex items-center gap-2">
          <Table className="size-6 text-gray-600" />
          <h3 className="text-2xl font-heading font-semibold text-gray-100">
            Todos as Marcas
          </h3>
        </div>
        <div
          id="table-to-export"
          className="w-full h-full overflow-y-auto flex flex-col gap-2"
        >
          <table>
            <thead>
              <tr>
                <th
                  onClick={() => handleSort("id")}
                  className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300"
                >
                  ID
                </th>
                <th
                  onClick={() => handleSort("description")}
                  className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300"
                >
                  Descrição
                </th>
                <th
                  onClick={() => handleSort("initialBalance")}
                  className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300"
                >
                  Valor Estoque Inicial
                </th>
                <th
                  onClick={() => handleSort("finalBalance")}
                  className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300"
                >
                  Valor Estoque Final
                </th>
                <th
                  onClick={() => handleSort("averageStock")}
                  className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300"
                >
                  Valor Médio do Estoque
                </th>
                <th
                  onClick={() => handleSort("totalPurchases")}
                  className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300"
                >
                  Valor em Compras no Período
                </th>
                <th
                  onClick={() => handleSort("inventoryTurnover")}
                  className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300"
                >
                  Giros de Estoque
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData?.map((row) => (
                <tr
                  key={`${row.id}-${row.inventoryTurnover}`}
                  className="border border-gray-800"
                >
                  <td className="px-4 py-2 text-sm text-gray-100 text-center">
                    {row.id}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-100 text-center">
                    {row.description}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-100 text-center">
                    ${formatCurrency(row.initialBalance)}
                  </td>

                  <td className="px-4 py-2 text-sm text-gray-100 text-center">
                    ${formatCurrency(row.finalBalance)}
                  </td>

                  <td className="px-4 py-2 text-sm text-gray-100 text-center">
                    ${formatCurrency(row.averageStock)}
                  </td>

                  <td className="px-4 py-2 text-sm text-gray-100 text-center">
                    ${formatCurrency(row.totalPurchases)}
                  </td>

                  <td className="px-4 py-2 text-sm text-gray-100 text-center">
                    {row.inventoryTurnover.toFixed()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    </Modal>
  );
};

export default ModalTable;
