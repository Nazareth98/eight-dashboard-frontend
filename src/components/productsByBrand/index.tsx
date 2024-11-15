import { ApexOptions } from "apexcharts";
import { useContext, useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import { productAnalysisContext } from "../../contexts/productsAnalysisContext";
import { formatCurrency } from "../../utils/generalsUtils";
import ComponentContainer from "../shared/componentContainer";
import Loading from "../shared/loading";
import ModalTable from "./modalTable";

const ProductsByBrand = () => {
  const { salesByBrand } = useContext(productAnalysisContext);

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any[]>();

  const [valueData, setValueData] = useState<number[]>();
  const [amountData, setAmountData] = useState<number[]>();

  const [labels, setLabels] = useState<string[]>();

  function updateChartData(sales) {
    const newDataValue = [];
    const newDataProfit = [];
    const newDataAmount = [];

    const newLabels = [];
    sales.sort((a, b) => b.saleValue - a.saleValue);

    for (let i = 0; i < sales.length; i++) {
      newLabels.push(sales[i].brandName);
      newDataValue.push(sales[i].saleValue);
      newDataProfit.push(sales[i].profitValue);
      newDataAmount.push(sales[i].amount);
    }

    setValueData(newDataValue);
    setAmountData(newDataAmount);
    setLabels(newLabels);
  }

  useEffect(() => {
    if (salesByBrand) {
      updateChartData(salesByBrand);
    }
  }, [salesByBrand]);

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
      text: "Ranking por marca",
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
        style: {
          colors: "#C2CCC2", // Cor das labels do eixo X
          fontSize: "12px",
        },
      },
    },
    yaxis: [
      {
        labels: {
          formatter: function (val) {
            return `$${formatCurrency(val)}`;
          },
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
      name: "Quantidade",
      type: "bar",
      data: amountData,
    },
  ];

  function handleClick(event) {
    setModalData(salesByBrand);
    setModalIsOpen(true);
  }

  return (
    <ComponentContainer classToAdd="row-span-6 col-span-5 relative">
      <ModalTable
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        modalData={modalData}
      />
      {valueData ? (
        <div className="h-full">
          <ApexChart
            type="bar"
            options={options}
            onClick={handleClick}
            className="cursor-pointer"
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

export default ProductsByBrand;
