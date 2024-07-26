import { ApexOptions } from "apexcharts";
import { useContext, useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import { productAnalysisContext } from "../../contexts/productsAnalysisContext";
import { formatCurrency } from "../../utils/generalsUtils";
import ComponentContainer from "../shared/componentContainer";
import Loading from "../shared/loading";
import ModalTable from "./modalTable";

const ProductsByGroup = () => {
  const { salesByGroup } = useContext(productAnalysisContext);

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any[]>();

  const [valueData, setValueData] = useState<number[]>();
  const [profitData, setProfitData] = useState<number[]>();
  const [amountData, setAmountData] = useState<number[]>();

  const [labels, setLabels] = useState<string[]>();

  function updateChartData(sales) {
    const newDataValue = [];
    const newDataProfit = [];
    const newDataAmount = [];

    const newLabels = [];
    sales.sort((a, b) => b.saleValue - a.saleValue);

    for (let i = 0; i < sales.length; i++) {
      newLabels.push(sales[i].description);
      newDataValue.push(sales[i].saleValue);
      newDataProfit.push(sales[i].profitValue);
      newDataAmount.push(sales[i].amount);
    }
    console.log("labels", newLabels);
    setValueData(newDataValue);
    setProfitData(newDataProfit);
    setAmountData(newDataAmount);
    setLabels(newLabels);
  }

  useEffect(() => {
    if (salesByGroup) {
      updateChartData(salesByGroup);
    }
  }, [salesByGroup]);

  const options: ApexOptions = {
    colors: ["#4A99F2", "#45C93B", "#CEAF09"],
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true, // Configuração para barras horizontais
        borderRadius: 0, // Remove bordas arredondadas
        columnWidth: "60%", // Ajusta a largura das colunas
        dataLabels: {
          position: "top", // Posição das labels no topo das barras
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false, // Remove a borda das barras
    },
    title: {
      text: "Ranking por Grupo",
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#ffffff", // cor do título
      },
    },
    subtitle: {
      text: "Valores em dólar americano",
      align: "left",
      style: {
        fontSize: "12px",
        color: "#cccccc", // cor do subtítulo
      },
    },
    labels: labels,
    xaxis: {
      type: "category",
      labels: {
        show: false,
        style: {
          colors: "#C2CCC2", // Cor das labels do eixo X
          fontSize: "12px",
        },
      },
    },
    yaxis: [
      {
        labels: {
          style: {
            colors: "#C2CCC2",
            fontSize: "12px",
          },
        },
      },
    ],
    legend: {
      horizontalAlign: "left",
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: [
        {
          formatter: function (val) {
            return `$${formatCurrency(val)}`;
          },
        },
        {
          formatter: function (val) {
            return `$${formatCurrency(val)}`;
          },
        },
        {
          formatter: function (val) {
            return `${val.toLocaleString()} un`;
          },
        },
      ],
    },
  };

  const series: ApexAxisChartSeries = [
    {
      name: "Valor",
      type: "bar",
      data: valueData,
    },
    {
      name: "Lucro",
      type: "bar",
      data: profitData,
    },
    {
      name: "Quantidade",
      type: "bar",
      data: amountData,
    },
  ];

  function handleClick(event) {
    setModalData(salesByGroup);
    setModalIsOpen(true);
  }

  return (
    <ComponentContainer classToAdd="row-span-6 col-span-7 relative">
      <ModalTable
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        modalData={modalData}
      />
      {valueData ? (
        <div className="h-full">
          <ApexChart
            onClick={handleClick}
            className="cursor-pointer"
            type="bar"
            options={options}
            series={series}
            height={"100%"}
          />
        </div>
      ) : (
        <Loading />
      )}
    </ComponentContainer>
  );
};

export default ProductsByGroup;
