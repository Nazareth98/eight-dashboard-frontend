import React, { useState } from "react";
import ComponentContainer from "../shared/componentContainer";
import { BarChart3 } from "lucide-react";
import CustomSubtitle from "../shared/customSubtitle";
import { getData } from "../../services/API";
import ModalChart from "./modalChart";

const options = [
  {
    id: 1,
    label: "Lucro Líquido",
    endpoint: "net-profit",
  },
  {
    id: 2,
    label: "Lucro Bruto",
    endpoint: "gross-profit",
  },
  {
    id: 3,
    label: "Compras",
    endpoint: "purchases",
  },
  {
    id: 4,
    label: "Vendas",
    endpoint: "sales",
  },
  {
    id: 5,
    label: "Estoque",
    endpoint: "stock",
  },
];

interface ChartDataType {
  date: string;
  value: number;
}

const AnnualComparison = () => {
  const [data, setData] = useState<ChartDataType[]>();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState<string>("");

  async function getChartData({ currentTarget }) {
    try {
      setData(undefined);
      const id = currentTarget.id;
      const selectedOption = options.find((option) => option.id == id);
      const endpoint = `/data/${selectedOption.endpoint}`;
      const response = await getData(endpoint);
      setModalIsOpen(true);
      setModalTitle(selectedOption.label);
      setData(response.result);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <ComponentContainer classToAdd="row-span-3 col-span-12">
      <CustomSubtitle
        subtitle="Comparativo Anual"
        icon={<BarChart3 className="size-5" />}
      />
      <ModalChart
        data={data}
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        title={modalTitle}
      />
      <div className="w-full h-full flex items-center justify-between gap-8">
        {options.map((option) => {
          return (
            <div
              id={option.id.toString()}
              onClick={getChartData}
              className="border-2 border-gray-700 w-full h-full rounded-lg flex items-center justify-center text-lg font-heading text-gray-600 cursor-pointer transition-all hover:bg-primary-500 hover:border-primary-400 hover:text-primary-950 hover:font-medium active:bg-primary-600"
            >
              {option.label}
            </div>
          );
        })}
      </div>
    </ComponentContainer>
  );
};

export default AnnualComparison;
