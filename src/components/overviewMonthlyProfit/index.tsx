import React, { useContext, useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import { overviewContext } from "../../contexts/overviewContext";
import { formatCurrency } from "../../utils/generalsUtils";
import ModalWeekly from "./modalWeekly";

const OverviewMonthlyProfit = () => {
  const { mainValues, getDailyProfit } = useContext(overviewContext);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    if (mainValues) {
      const sales = mainValues.monthlyProfit;
      const newLabels = [];
      const newData = [];
      for (let i = 0; i < sales.length; i++) {
        newLabels.push(sales[i].label);
        newData.push(sales[i].value);
      }
      setChartLabels(newLabels);
      setChartData(newData);
    }
  }, [mainValues]);

  async function handleBarClick(event, chartContext, config) {
    const selectedMonth = mainValues.monthlyProfit[config.dataPointIndex];
    const month = selectedMonth.number;
    const year = selectedMonth.year;

    const result = await getDailyProfit(month, year);

    setWeeklyData(result);
    setModalIsOpen(true);
  }

  const options = {
    colors: ["#45C93B"],
    plotOptions: {
      bar: {
        horizontal: true, // Configura as barras como horizontais
      },
    },
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      events: {
        dataPointSelection: handleBarClick,
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
      text: "Lucro Mensal",
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
        show: false, // Remove as labels do eixo X
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return `${val.toLocaleString()}`;
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
      name: "Lucro",
      data: chartData,
    },
  ];

  return (
    <div className="col-span-4 row-span-6 p-6 rounded-xl border-2 border-gray-900 flex flex-col gap-4 cursor-pointer transition-all hover:bg-gray-950 active:bg-gray-900 fade-left">
      <ModalWeekly
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        data={weeklyData}
      />
      <div className="h-full">
        <ApexChart
          type="bar"
          options={options}
          series={series}
          height={"100%"}
        />
      </div>
    </div>
  );
};

export default OverviewMonthlyProfit;
