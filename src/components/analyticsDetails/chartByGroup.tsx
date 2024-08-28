import React, { useContext, useEffect, useState } from "react";
import ComponentContainer from "../shared/componentContainer";
import CustomSubtitle from "../shared/customSubtitle";
import { analyticsContext } from "../../contexts/analyticsContext";
import { ApexOptions } from "apexcharts";
import ApexChart from "react-apexcharts";
import CustomButton from "../shared/customButton";
import { Archive, DollarSign } from "lucide-react";
import { formatCurrency } from "../../utils/generalsUtils";

const ChartByGroup = () => {
  const { customerDetails } = useContext(analyticsContext);

  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [selectCondition, setSelectCondition] = useState("value");

  function getChartValues(condition: string) {
    if (condition === "amount") {
      const chartValues = customerDetails.reduce((acc, order) => {
        order.products.forEach((product) => {
          acc[product.group] = (acc[product.group] || 0) + product.amount;
        });
        return acc;
      }, {});
      return chartValues;
    } else if (condition === "value") {
      const chartValues = customerDetails.reduce((acc, order) => {
        order.products.forEach((product) => {
          acc[product.group] =
            (acc[product.group] || 0) + product.amount * product.price;
        });
        return acc;
      }, {});
      return chartValues;
    }
  }

  useEffect(() => {
    if (!customerDetails) return;
    const chartValues = getChartValues(selectCondition);
    const sortedProducts = Object.entries(chartValues)
      .map(([description, total]) => ({ description, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);

    setChartLabels(sortedProducts.map((product) => product.description));
    setChartData(sortedProducts.map((product) => product.total));
  }, [customerDetails]);

  useEffect(() => {
    if (!customerDetails) return;
    const chartValues = getChartValues(selectCondition);
    console.log(chartValues);
    const sortedProducts = Object.entries(chartValues)
      .map(([description, total]) => ({ description, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);

    setChartLabels(sortedProducts.map((product) => product.description));
    setChartData(sortedProducts.map((product) => product.total));
  }, [customerDetails, selectCondition]);

  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (val) {
          if (selectCondition === "amount") {
            return `${val.toLocaleString()} peças`;
          } else if (selectCondition === "value") {
            return `$${formatCurrency(val)}`;
          } else {
            return `${val}`;
          }
        },
      },
    },
    dataLabels: {
      enabled: false,
      formatter: function (val) {
        return `${val} unidades`;
      },
    },
    title: {
      text: "Ranking por Grupo",
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#ffffff",
      },
    },
    subtitle: {
      text: "Quantidade total vendida",
      align: "left",
      style: {
        fontSize: "12px",
        color: "#cccccc",
      },
    },
    labels: chartLabels,
    legend: {
      labels: {
        colors: "#bbb",
      },
    },
  };

  const series = chartData;

  function toogleCondition({ currentTarget }) {
    setSelectCondition(currentTarget.id);
  }

  return (
    <ComponentContainer classToAdd="row-span-6 col-span-5 relative">
      <div className="h-full">
        <ApexChart
          className="fade-left"
          type="pie"
          options={options}
          series={series}
          height={"100%"}
        />
      </div>
      <div className="flex gap-4 absolute items-center rounded bottom-8 right-8 z-10 fade-right">
        <CustomButton
          id="value"
          theme={selectCondition === "value" ? "default" : "alternate"}
          onClick={toogleCondition}
        >
          <DollarSign className="size-4" />
          valor
        </CustomButton>
        <CustomButton
          id="amount"
          theme={selectCondition === "amount" ? "default" : "alternate"}
          onClick={toogleCondition}
        >
          <Archive className="size-4" />
          peças
        </CustomButton>
      </div>
    </ComponentContainer>
  );
};

export default ChartByGroup;
