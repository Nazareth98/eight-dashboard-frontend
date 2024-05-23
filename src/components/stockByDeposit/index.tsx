import { useContext, useEffect, useState } from "react";
import CustomSubtitle from "../shared/customSubtitle";
import IconDispatches from "../../assets/svg/iconDispatches";
import { PieChart } from "@mui/x-charts";
import { stockContext } from "../../contexts/stockContext";
import Loading from "../shared/loading";

function groupAndSumByStock(list, brandName) {
  const groups = {};

  list.forEach((item) => {
    const brand = item.group;
    if (brand === brandName) {
      const deposits = item.deposits;

      Object.entries(deposits).forEach(([deposit, quantity], index) => {
        if (!groups[deposit] && quantity > 0) {
          groups[deposit] = {
            id: index + 1,
            label: deposit,
            value: 0,
          };
        }
        if (groups[deposit]) {
          groups[deposit].value += quantity;
        }
      });
    }
  });

  const result = Object.values(groups);

  return result;
}

function groupAndSumByValue(list, brandName) {
  const groups = {};

  list.forEach((item) => {
    const brand = item.group;
    if (brand === brandName) {
      const deposits = item.deposits;
      const cost = item.cost;

      Object.entries(deposits).forEach(([deposit, quantity], index) => {
        if (!groups[deposit] && quantity > 0) {
          groups[deposit] = {
            id: index + 1,
            label: deposit,
            value: 0,
          };
        }
        if (groups[deposit]) {
          console.log(quantity, cost);
          groups[deposit].value += quantity * cost;
        }
      });
    }
  });

  const result = Object.values(groups);

  return result;
}

const StockByDeposit = ({ selectGroup, setSelectDeposit }) => {
  const { stockData } = useContext(stockContext);

  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState();

  const [selectCondition, setSelectCondition] = useState("stock");

  useEffect(() => {
    function loadChartData() {
      const groups =
        selectCondition === "stock"
          ? groupAndSumByStock(stockData, selectGroup.label)
          : groupAndSumByValue(stockData, selectGroup.label);
      setChartData(groups);
      setTimeout(() => setIsLoading(false), 300);
    }

    if (stockData && selectGroup) {
      setIsLoading(true);
      loadChartData();
    }
  }, [selectGroup, selectCondition]);

  function handleClick(event, d) {
    const depositIndex = d.dataIndex;
    const currentDeposit = chartData[depositIndex];
    setSelectDeposit(currentDeposit.label);
  }

  function toogleCondition({ currentTarget }) {
    setSelectCondition(currentTarget.id);
  }

  return (
    <div className="h-[25rem] col-span-6 row-span-6 bg-gray-900 p-4 rounded-sm border-2 border-gray-800 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <CustomSubtitle
          icon={<IconDispatches fill="fill-primary-400" width="25px" />}
          subtitle="Estoque por Depositos"
        />
        <div className="flex items-center rounded">
          <div
            id="value"
            className={`px-4 py-2 rounded-l font-semibold font-heading transition flex flex-row items-center justify-center gap-2 cursor-pointer border ${
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
            <PieChart
              series={[{ data: chartData }]}
              slotProps={{
                legend: {
                  labelStyle: {
                    fontSize: 16,
                    fill: "white",
                  },
                },
              }}
              onItemClick={handleClick}
            />
          )}
        </>
      )}
    </div>
  );
};

export default StockByDeposit;
