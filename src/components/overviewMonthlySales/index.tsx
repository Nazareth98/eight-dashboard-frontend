import React, { useContext, useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import { overviewContext } from "../../contexts/overviewContext";
import { formatCurrency } from "../../utils/generalsUtils";
import ModalWeekly from "./modalWeekly";
import ComponentContainer from "../shared/componentContainer";
import { ApexOptions } from "apexcharts";

const OverviewMonthlySales = () => {
  const { mainValues, getDailySales } = useContext(overviewContext);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [weeklyData, setWeeklyData] = useState([]);

  async function handleBarClick(event, chartContext, config) {
    const selectedMonth = mainValues.monthlySales[config.dataPointIndex];
    const month = selectedMonth.number;
    const year = selectedMonth.year;

    const result = await getDailySales(month, year);

    setWeeklyData(result);
    setModalIsOpen(true);
  }

  const options: ApexOptions = {
    colors: ["#4A99F2"],
    plotOptions: {
      bar: {
        horizontal: true,
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
      text: "Vendas Mensais",
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#ffffff", // cor do título
      },
    },
    subtitle: {
      text: "Valores em dóllar americano",
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
      name: "Vendas",
      data: chartData,
    },
  ];

  useEffect(() => {
    if (mainValues) {
      const sales = mainValues.monthlySales;
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

  return (
    <ComponentContainer classToAdd="col-span-4 row-span-7">
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
    </ComponentContainer>
  );
};

export default OverviewMonthlySales;
