import React, { Dispatch, useEffect, useState } from "react";
import Modal, { Styles } from "react-modal";
import { formatCurrency, sortTableData } from "../../utils/generalsUtils";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Printer, Table } from "lucide-react";
import CustomButton from "../shared/customButton";
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

  const exportPDF = () => {
    const doc = new jsPDF();

    // Obtenha a data atual no formato brasileiro
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(
      today.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${today.getFullYear()}`;
    const formattedTime = `${today
      .getHours()
      .toString()
      .padStart(2, "0")}:${today
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${today.getSeconds().toString().padStart(2, "0")}`;

    // Adiciona o cabeçalho com a data e a hora
    doc.setFontSize(12);
    doc.text(`${formattedDate} - ${formattedTime}`, 14, 15);

    // Adiciona o título
    doc.setFontSize(18);
    doc.text("Vendas por Produtos", 14, 30);

    // Adiciona a tabela
    doc.autoTable({
      startY: 40,
      head: [["Dígito", "Descrição", "Valor Venda", "Quantidade"]],
      body: chartData?.map((row) => [
        row.digit,
        row.description,
        `$${formatCurrency(row.saleValue)}`,
        row.amount.toLocaleString(),
      ]),
      theme: "grid",
      headStyles: { fillColor: [40, 40, 40] },
      margin: { horizontal: 10 },
    });

    doc.save(`vendas-produtos-${formattedDate}-${formattedTime}.pdf`);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      {modalData && (
        <>
          <div className="w-full flex items-center gap-2">
            <Table className="size-6 text-gray-600" />
            <h3 className="text-2xl font-heading font-semibold text-gray-100">
              Todos os Produtos
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
                    onClick={() => handleSort("digit")}
                    className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300"
                  >
                    Dígito
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
                  <tr key={row.id} className="border border-gray-800">
                    <td className="px-4 py-2 text-sm text-gray-100 text-center">
                      {row.digit}
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
          <CustomButton onClick={exportPDF}>
            <Printer className="size-4" />
            imprimir
          </CustomButton>
        </>
      )}
    </Modal>
  );
};

export default ModalTable;
