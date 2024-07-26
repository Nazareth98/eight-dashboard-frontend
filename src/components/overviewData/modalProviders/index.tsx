import { ProviderProps, useContext, useEffect, useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");

import CustomButton from "../../shared/customButton";
import { overviewContext } from "../../../contexts/overviewContext";
import IconClip from "../../../assets/svg/iconClip";
import { formatCurrency } from "../../../utils/generalsUtils";
import { ProviderType } from "../../../types/providerType";
import IconBack from "../../../assets/svg/iconBack";
import { ArrowLeft } from "lucide-react";

function compareValues(a, b, sortBy, sortOrder) {
  if (a === b) {
    return 0;
  }
  if (typeof a === "string" && typeof b === "string") {
    return sortOrder === "asc" ? a.localeCompare(b) : b.localeCompare(a);
  } else if (typeof a === "number" && typeof b === "number") {
    return sortOrder === "asc" ? a - b : b - a;
  } else {
    const valueA = String(a);
    const valueB = String(b);
    return sortOrder === "asc"
      ? valueA.localeCompare(valueB)
      : valueB.localeCompare(valueA);
  }
}

const ModalProviders = (props) => {
  const { getProviders } = useContext(overviewContext);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [providers, setProviders] = useState<ProviderType[]>();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function loadData() {
      const currentValues = await getProviders();
      setProviders(currentValues);
      calculateTotal(currentValues);
    }

    loadData();
  }, []);

  const calculateTotal = (data: ProviderType[]) => {
    const totalSaldo = data.reduce(
      (acc, provider) => acc + provider.balance,
      0
    );
    setTotal(totalSaldo);
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
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

  const handleSort = (columnName) => {
    if (sortBy === columnName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(columnName);
      setSortOrder("asc");
    }
  };

  const sortedData = providers?.slice().sort((a, b) => {
    if (sortBy) {
      const valueA = a[sortBy];
      const valueB = b[sortBy];
      return compareValues(valueA, valueB, sortBy, sortOrder);
    }
    return 0;
  });

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="w-full flex items-center gap-2">
        <IconClip width="40px" fill="fill-primary-300" />

        <h3 className="font-heading font-semibold text-gray-50 text-3xl">
          Lista de Provedores
        </h3>
      </div>

      {providers && (
        <div className="w-full h-full overflow-y-auto flex flex-col gap-2">
          <table>
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300">
                  Código
                </th>
                <th
                  onClick={() => handleSort("digito")}
                  className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300"
                >
                  Dígito
                </th>
                <th
                  onClick={() => handleSort("nome")}
                  className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300"
                >
                  Nome
                </th>
                <th
                  onClick={() => handleSort("saldo")}
                  className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300"
                >
                  Saldo
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((provider) => (
                <tr key={provider.id} className="border border-gray-800">
                  <td className="px-4 py-2 text-sm text-gray-100 text-center">
                    {provider.id}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-100 text-center">
                    {provider.digit}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-100 text-center">
                    {provider.name}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-100 text-center">
                    ${formatCurrency(provider.balance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="w-full flex items-center justify-center gap-8">
        <div className="w-full flex items-center justify-start gap-1 py-2  font-semibold text-gray-200">
          Total:
          <span className="text-primary-400 font-heading text-xl ">
            ${formatCurrency(total)}
          </span>
        </div>
        <CustomButton theme="danger" onClick={closeModal}>
          <ArrowLeft className="size-4" />
          voltar
        </CustomButton>
      </div>
    </Modal>
  );
};

export default ModalProviders;