import React, { useContext, useEffect, useState } from "react";
import ComponentContainer from "../shared/componentContainer";
import { analyticsContext } from "../../contexts/analyticsContext";
import { ApexOptions } from "apexcharts";
import ApexChart from "react-apexcharts";

const AnalyticsAbcAnalysis = () => {
  const { abcAnalysisData } = useContext(analyticsContext);

  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!abcAnalysisData) return;

    const newLabels = [];
    const newData = [];

    for (let i = 0; i < 20; i++) {
      newLabels.push(abcAnalysisData[i].customerName);
      newData.push(abcAnalysisData[i].abcAnalysis.abcPercentage);
    }

    setChartLabels(newLabels);
    setChartData(newData);
  }, [abcAnalysisData]);

  const options: ApexOptions = {
    colors: ["#45C93B"],
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return `${val}%`;
      },
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Top 20 Curva ABC",
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#ffffff", // cor do título
      },
    },
    subtitle: {
      text: "Valores em porcentagem",
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
          colors: "#C2CCC2", // Cor das labels do eixo Y
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return `${val}%`;
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
      name: "Porcentagem do Faturamento",
      data: chartData,
    },
  ];

  return (
    <ComponentContainer cols="6" rows="6">
      <div className="h-full">
        <ApexChart
          type="area"
          options={options}
          series={series}
          height={"100%"}
        />
      </div>
    </ComponentContainer>
  );
};

export default AnalyticsAbcAnalysis;
