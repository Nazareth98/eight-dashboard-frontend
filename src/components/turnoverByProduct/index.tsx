import { useContext, useEffect, useState } from "react";
import ComponentContainer from "../shared/componentContainer";
import { inventoryTurnoverContext } from "../../contexts/InventoryTurnoverContext";
import { ApexOptions } from "apexcharts";
import ApexChart from "react-apexcharts";
import CustomButton from "../shared/customButton";
import { PlusCircle } from "lucide-react";
import ModalTable from "./modalTable";

const TurnoverByProduct = () => {
  const { dataByProduct } = useContext(inventoryTurnoverContext);

  const [chartData, setChartData] = useState<number[]>();
  const [chartLabels, setChartLabels] = useState<string[]>();

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!dataByProduct) return;

    const newData = [];
    const newLabels = [];

    for (let i = 0; i < 10; i++) {
      newData.push(Number(dataByProduct[i].inventoryTurnover.toFixed(1)));
      newLabels.push(dataByProduct[i].description);
    }

    setChartData(newData);
    setChartLabels(newLabels);
  }, [dataByProduct]);

  const options: ApexOptions = {
    colors: ["#45C93B", "#4A99F2", "#CEAF09"],
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
      enabled: true,
    },
    stroke: {
      show: false, // Remove a borda das barras
    },
    title: {
      text: "Top 10 Produtos",
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#ffffff", // cor do título
      },
    },
    subtitle: {
      text: "Valores representam numero de giros",
      align: "left",
      style: {
        fontSize: "12px",
        color: "#cccccc", // cor do subtítulo
      },
    },
    labels: chartLabels,
    xaxis: {
      type: "category",
      labels: {
        formatter: function (val) {
          return `${val}`;
        },
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
    },
  };

  const series: ApexAxisChartSeries = [
    {
      name: "Giros",
      type: "bar",
      data: chartData,
    },
  ];

  return (
    <ComponentContainer classToAdd="row-span-6 col-span-9 relative">
      <ModalTable
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        modalData={dataByProduct}
      />
      <div className="absolute right-8 z-10">
        <CustomButton theme="alternate" onClick={() => setModalIsOpen(true)}>
          <PlusCircle className="size-4" />
          ver detalhes
        </CustomButton>
      </div>
      <div className="h-full">
        <ApexChart
          className="cursor-pointer"
          type="bar"
          options={options}
          series={series}
          height={"100%"}
        />
      </div>
    </ComponentContainer>
  );
};

export default TurnoverByProduct;
