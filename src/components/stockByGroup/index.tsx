import React, { useContext, useEffect, useState } from "react";
import ApexChart from "react-apexcharts";

import { stockContext } from "../../contexts/stockContext";
import { authContext } from "../../contexts/authContext";
import { formatCurrency } from "../../utils/generalsUtils";
import Loading from "../shared/loading";
import CustomButton from "../shared/customButton";
import IconPayments from "../../assets/svg/iconPayments";
import IconStock from "../../assets/svg/iconStock";
import { ApexOptions } from "apexcharts";
import { Archive, DollarSign } from "lucide-react";
import ComponentContainer from "../shared/componentContainer";

function groupAndSumByStock(list) {
  const groups = {};
  list.forEach((item, index) => {
    const key = item["group"];
    const total = item.total;

    if (!groups[key]) {
      groups[key] = {
        id: index + 1,
        label: key,
        data: 0,
      };
    }
    groups[key].data += total;
  });
  const result = Object.values(groups);
  result.sort((a, b) => b.data - a.data);

  return result;
}

function groupAndSumByValue(list) {
  const groups = {};

  list.forEach((item, index) => {
    const key = item["group"];
    const cost = item.cost;
    const total = item.total;
    const totalCost = cost * total;

    if (!groups[key]) {
      groups[key] = {
        id: index + 1,
        label: key,
        data: 0,
      };
    }
    groups[key].data += totalCost;
  });
  const result = Object.values(groups);
  result.sort((a, b) => b.data - a.data);

  return result;
}

const StockByGroup = ({ setSelectGroup, setSelectDeposit }) => {
  const { user } = useContext(authContext);
  const { stockData } = useContext(stockContext);

  const [isLoading, setIsLoading] = useState(false);

  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);

  const [selectCondition, setSelectCondition] = useState("stock");

  useEffect(() => {
    function loadChartData() {
      const productGroups =
        selectCondition === "stock"
          ? groupAndSumByStock(stockData)
          : groupAndSumByValue(stockData);
      const newLabels = [];
      const newData = [];

      for (let i = 0; i < productGroups.length; i++) {
        newLabels.push(productGroups[i].label);
        newData.push(productGroups[i].data);
      }

      setChartLabels(newLabels);
      setChartData(newData);
      setTimeout(() => setIsLoading(false), 300);
    }

    if (stockData) {
      setIsLoading(true);
      loadChartData();
    }
  }, [stockData, selectCondition]);

  const options: ApexOptions = {
    colors: ["#45C93B"],
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const selectIndex = config.dataPointIndex;
          const groupName = chartLabels[selectIndex];
          setSelectGroup(groupName);
          setSelectDeposit();
        },

        xAxisLabelClick: function (event, chartContext, config) {
          const selectIndex = config.labelIndex;
          const groupName = chartLabels[selectIndex];
          setSelectGroup(groupName);
          setSelectDeposit();
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        if (selectCondition === "value") {
          return `$${formatCurrency(val)}`;
        } else return val;
      },
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Estoque por grupo",
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
          colors: "#C2CCC2", // Cor das labels do eixo Y
          fontSize: "12px",
        },
        formatter: function (val) {
          return `${val.toLocaleString()}`;
        },
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
      name: "Estoque por Grupo",
      data: chartData,
    },
  ];

  const toogleCondition = ({ currentTarget }) => {
    setSelectCondition(currentTarget.id);
  };

  return (
    <ComponentContainer cols="8" rows="6" classToAdd="relative col-span-8">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {user.accessLevel !== 3 ? null : (
            <div className="flex gap-4 absolute items-center rounded right-8 z-10 fade-right">
              <CustomButton
                id="value"
                theme={selectCondition === "value" ? "default" : "alternate"}
                onClick={toogleCondition}
              >
                <DollarSign className="size-4" />
                valor
              </CustomButton>
              <CustomButton
                id="stock"
                theme={selectCondition === "stock" ? "default" : "alternate"}
                onClick={toogleCondition}
              >
                <Archive className="size-4" />
                peças
              </CustomButton>
            </div>
          )}
          {chartData && (
            <div className="h-full fade-left">
              <ApexChart
                type="bar"
                options={options}
                series={series}
                height={"100%"}
              />
            </div>
          )}
        </>
      )}
    </ComponentContainer>
  );
};

export default StockByGroup;
