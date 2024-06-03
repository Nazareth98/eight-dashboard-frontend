import React, { useContext, useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import { overviewContext } from "../../contexts/overviewContext";
import { formatCurrency } from "../../utils/generalsUtils";

const OverviewMonthlyPurchases = () => {
  const { mainValues } = useContext(overviewContext);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (mainValues) {
      const sales = mainValues.monthlyPurchases;
      const newLabels = [];
      const newData = [];

      for (let i = 0; i < sales.length; i++) {
        console.log(sales);
        newLabels.push(sales[i].label);
        newData.push(sales[i].data);
      }

      setChartLabels(newLabels);
      setChartData(newData);
    }
  }, [mainValues]);

  const options = {
    colors: ["#CEAF09"],
    chart: {
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return `$${formatCurrency(val)}`;
      },
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Compras Mensais",
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
    labels: chartLabels,
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
        formatter: function (val) {
          return `$${val.toLocaleString()}`;
        },
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
      name: "Compras",
      data: chartData,
    },
  ];

  return (
    <div className="col-span-4 row-span-4 bg-gray-900 p-6 rounded-xl border border-gray-800 flex flex-col gap-4">
      <div className="h-full">
        <ApexChart
          type="area"
          options={options}
          series={series}
          height={"100%"}
        />
      </div>
    </div>
  );
};

export default OverviewMonthlyPurchases;
