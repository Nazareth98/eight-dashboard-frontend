import { useContext, useEffect, useState } from "react";
import ComponentContainer from "../shared/componentContainer";
import { inventoryTurnoverContext } from "../../contexts/InventoryTurnoverContext";
import { ApexOptions } from "apexcharts";
import ApexChart from "react-apexcharts";
import CustomButton from "../shared/customButton";
import { PlusCircle } from "lucide-react";
import ModalTable from "./modalTable";

const TurnoverByBrand = () => {
  const { dataByBrand } = useContext(inventoryTurnoverContext);

  const [chartData, setChartData] = useState<number[]>();
  const [chartLabels, setChartLabels] = useState<string[]>();

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!dataByBrand) return;

    const newData = [];
    const newLabels = [];

    for (let i = 0; i < dataByBrand.length; i++) {
      newData.push(Number(dataByBrand[i].inventoryTurnover.toFixed(1)));
      newLabels.push(dataByBrand[i].description);
    }

    setChartData(newData);
    setChartLabels(newLabels);
  }, [dataByBrand]);

  const options: ApexOptions = {
    colors: ["#4A99F2"],
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
      text: "Top 10 Marcas",
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
    <ComponentContainer classToAdd="row-span-6 col-span-6 relative">
      <ModalTable
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        modalData={dataByBrand}
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

export default TurnoverByBrand;
