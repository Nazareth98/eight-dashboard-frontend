import { useContext, useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import { stockContext } from "../../contexts/stockContext";
import Loading from "../shared/loading";
import { authContext } from "../../contexts/authContext";
import { formatCurrency } from "../../utils/generalsUtils";
import CustomButton from "../shared/customButton";
import IconPayments from "../../assets/svg/iconPayments";
import IconStock from "../../assets/svg/iconStock";
import {
  Archive,
  DollarSign,
  MousePointerClick,
  Pointer,
  Search,
  TextCursor,
} from "lucide-react";
import ComponentContainer from "../shared/componentContainer";

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

  return Object.values(groups);
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
          groups[deposit].value += quantity * cost;
        }
      });
    }
  });

  return Object.values(groups);
}

const StockByDeposit = ({ selectGroup, setSelectDeposit }) => {
  const { stockData } = useContext(stockContext);
  const { user } = useContext(authContext);

  const [isLoading, setIsLoading] = useState(false);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [selectCondition, setSelectCondition] = useState("stock");

  useEffect(() => {
    function loadChartData() {
      const productGroups =
        selectCondition === "stock"
          ? groupAndSumByStock(stockData, selectGroup)
          : groupAndSumByValue(stockData, selectGroup);

      const newLabels = [];
      const newData = [];

      for (let i = 0; i < productGroups.length; i++) {
        newLabels.push(productGroups[i].label);
        newData.push(productGroups[i].value); // Corrigido de 'data' para 'value'
      }

      setChartLabels(newLabels);
      setChartData(newData);
      setTimeout(() => setIsLoading(false), 300);
    }

    if (stockData && selectGroup) {
      setIsLoading(true);
      loadChartData();
    }
  }, [stockData, selectGroup, selectCondition]);

  const options = {
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
          const depName = chartLabels[selectIndex];
          setSelectDeposit(depName);
        },

        xAxisLabelClick: function (event, chartContext, config) {
          const selectIndex = config.labelIndex;
          const depName = chartLabels[selectIndex];
          setSelectDeposit(depName);
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
      text: `Estoque por Depósito - ${selectGroup || ""}`,
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

  function handleClick(event, d) {
    const depositIndex = d.dataIndex;
    const currentDeposit = chartData[depositIndex];
    setSelectDeposit(currentDeposit.label);
  }

  function toogleCondition({ currentTarget }) {
    setSelectCondition(currentTarget.id);
  }

  return (
    <ComponentContainer cols="8" rows="6" classToAdd="relative">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {selectGroup ? (
            <>
              {user.accessLevel !== 3 ? null : (
                <div className="flex gap-4 absolute items-center rounded right-8 z-10 fade-right">
                  <CustomButton
                    id="value"
                    theme={
                      selectCondition === "value" ? "default" : "alternate"
                    }
                    onClick={toogleCondition}
                  >
                    <DollarSign className="size-4" />
                    valor
                  </CustomButton>
                  <CustomButton
                    id="stock"
                    theme={
                      selectCondition === "stock" ? "default" : "alternate"
                    }
                    onClick={toogleCondition}
                  >
                    <Archive className="size-4" />
                    peças
                  </CustomButton>
                </div>
              )}
              <div className="h-full fade-left">
                <ApexChart
                  type="bar"
                  options={options}
                  series={series}
                  height={"100%"}
                />
              </div>
            </>
          ) : (
            <div className="w-full h-full inset-0 text-gray-500 font-heading flex items-center justify-center gap-2 fade-left">
              <MousePointerClick className="size-4" />
              <span>Selecione um grupo</span>
            </div>
          )}
        </>
      )}
    </ComponentContainer>
  );
};

export default StockByDeposit;
