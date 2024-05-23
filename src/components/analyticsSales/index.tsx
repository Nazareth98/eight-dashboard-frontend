import React from "react";
import CustomSubtitle from "../shared/customSubtitle";
import IconOrders from "../../assets/svg/iconOrders";
import ApexChart from "react-apexcharts";

const AnalyticsSales = () => {
  const options = {
    colors: ["#45C93B"],
    chart: {
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Análise mensal de valor de venda",
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#ffffff", // cor do título
      },
    },
    subtitle: {
      text: "Valores gastos",
      align: "left",
      style: {
        fontSize: "12px",
        color: "#cccccc", // cor do subtítulo
      },
    },
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    xaxis: {
      type: "category",
      labels: {
        style: {
          colors: "#C2CCC2", // Cor das labels do eixo X
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      opposite: true,
      labels: {
        style: {
          colors: "#C2CCC2", // Cor das labels do eixo Y
          fontSize: "12px",
        },
      },
    },
    legend: {
      horizontalAlign: "left",
    },
  };

  const series = [
    {
      name: "Vendas",
      data: [150, 200, 175, 225, 300, 250, 400, 375, 275, 325, 290, 310],
    },
  ];

  return (
    <div className="h-[30rem] col-span-12 row-span-1 bg-gray-900 p-6 rounded-xl border-2 border-gray-800 flex flex-col gap-4">
      <CustomSubtitle
        icon={<IconOrders fill="fill-gray-600" width="25px" />}
        subtitle="Comparativo de Vendas"
      />

      <div className="">
        <ApexChart
          type="bar"
          options={options}
          series={series}
          height={"380px"}
        />
      </div>
    </div>
  );
};

export default AnalyticsSales;
