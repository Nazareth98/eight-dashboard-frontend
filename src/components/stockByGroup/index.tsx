import React, { useContext, useEffect, useState } from "react";
import { axisClasses, BarChart } from "@mui/x-charts";

import CustomSubtitle from "../shared/customSubtitle";
import IconDispatches from "../../assets/svg/iconDispatches";
import { stockContext } from "../../contexts/stockContext";
import Loading from "../shared/loading";

let labels = [];

function groupAndSumByStock(list) {
  const groups = {};
  labels = [];
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

  for (let i = 0; i < result.length; i++) {
    labels.push(result[i].label);
  }

  return result;
}

function groupAndSumByValue(list) {
  const groups = {};
  labels = [];

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

  for (let i = 0; i < result.length; i++) {
    labels.push(result[i].label);
  }
  console.log(result, labels);
  return result;
}

const StockByGroup = ({ setSelectGroup, setSelectDeposit }) => {
  const { stockData } = useContext(stockContext);

  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState();
  const [chartOptions, setChartOptions] = useState();

  const [selectCondition, setSelectCondition] = useState("stock");

  useEffect(() => {
    function loadChartData() {
      groupAndSumByValue(stockData);
      const groups =
        selectCondition === "stock"
          ? groupAndSumByStock(stockData)
          : groupAndSumByValue(stockData);
      setChartOptions(groups);
      const values = [];
      for (let i = 0; i < groups.length; i++) {
        values.push(groups[i].data);
      }
      setChartData(values);
      setTimeout(() => setIsLoading(false), 600);
    }

    setIsLoading(true);
    if (stockData) {
      loadChartData();
    }
  }, [stockData, selectCondition]);

  function handleClick(event, d) {
    const selectGroup = chartOptions[d.dataIndex];
    setSelectGroup(selectGroup);
    setSelectDeposit(null);
  }

  function toogleCondition({ currentTarget }) {
    setSelectCondition(currentTarget.id);
  }

  return (
    <div className="h-[25rem] col-span-6 row-span-6 bg-gray-900 p-6 rounded-xl border-2 border-gray-800 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <CustomSubtitle
          icon={<IconDispatches fill="fill-primary-400" width="25px" />}
          subtitle="Estoque por Grupo"
        />
        <div className="flex items-center  rounded">
          <div
            id="value"
            className={`px-4 py-2 rounded-l font-semibold font-heading transition flex flex-row items-center justify-center gap-2 cursor-pointer border${
              selectCondition === "value"
                ? "border-primary-900 bg-primary-400 text-primary-800 hover:bg-primary-300"
                : "border-primary-900 text-primary-900 hover:bg-primary-950 hover:text-primary-600 hover:border-primary-600"
            } `}
            onClick={toogleCondition}
          >
            VALOR
          </div>
          <div
            id="stock"
            className={`px-4 py-2 rounded-r font-semibold font-heading transition flex flex-row items-center justify-center gap-2 cursor-pointer border ${
              selectCondition === "stock"
                ? "border-primary-900 bg-primary-400 text-primary-800 hover:bg-primary-300"
                : "border-primary-900 text-primary-900 hover:bg-primary-950 hover:text-primary-600 hover:border-primary-600"
            } `}
            onClick={toogleCondition}
          >
            PEÇAS
          </div>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {chartData && (
            <BarChart
              xAxis={[{ scaleType: "band", data: labels }]}
              series={[{ data: chartData, color: "#45C93B" }]}
              onItemClick={handleClick}
              sx={() => ({
                [`.${axisClasses.root}`]: {
                  [`.${axisClasses.tick}, .${axisClasses.line}`]: {
                    stroke: "white",
                    strokeWidth: 3,
                  },
                  [`.${axisClasses.tickLabel}`]: {
                    fill: "white",
                  },
                  [`.${axisClasses.label}`]: {
                    fill: "white",
                  },
                },
              })}
            />
          )}
        </>
      )}
    </div>
  );
};

export default StockByGroup;
