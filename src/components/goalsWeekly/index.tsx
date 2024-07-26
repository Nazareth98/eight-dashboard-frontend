import { ApexOptions } from "apexcharts";
import { Search, SearchX } from "lucide-react";
import { Dispatch, useContext, useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import { PaymentType } from "../../types/paymentType";
import { formatCurrency } from "../../utils/generalsUtils";
import ComponentContainer from "../shared/componentContainer";
import CustomButton from "../shared/customButton";
import { goalsContext } from "../../contexts/goalsContext";

const getWeekOfYear = (date): number => {
  const [day, month, year] = date.split("/");
  const currentDay = Number(day);
  if (currentDay <= 7) {
    return 1;
  } else if (currentDay <= 14) {
    return 2;
  } else if (currentDay <= 21) {
    return 3;
  } else {
    return 4;
  }
};

interface GoalsWeeklyProps {
  setDailyData: React.Dispatch<React.SetStateAction<PaymentType[]>>;
  setSelectedSheetsData: React.Dispatch<React.SetStateAction<any[]>>;
}

const GoalsWeekly = ({
  setDailyData,
  setSelectedSheetsData,
}: GoalsWeeklyProps) => {
  const { searchData, setCurrentCustomer, cleanSearchData } =
    useContext(goalsContext);

  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [resultData, setResultData] = useState([]);

  useEffect(() => {
    if (searchData) {
      const groupedByWeek = searchData.reduce((acc, item) => {
        const week = getWeekOfYear(item.payDay);
        if (!acc[week]) {
          acc[week] = {
            week,
            total: 0,
            items: [],
          };
        }
        acc[week].items.push(item);
        acc[week].total += item.value;
        return acc;
      }, {});

      const result = Object.values(groupedByWeek);
      result.sort((a, b) => a.week - b.week);

      const newLabels = [];
      const newData = [];

      setResultData(result);
      result.forEach((weekData) => {
        newLabels.push(`Semana ${weekData.week}`);
        newData.push(weekData.total);
      });

      setChartLabels(newLabels);
      setChartData(newData);
    }
  }, [searchData]);

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
      text: "Pagamentos por semana",
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
      name: "Pagamentos",
      data: chartData,
    },
  ];

  async function handleBarClick(event, chartContext, config) {
    const selectedWeek = resultData[config.dataPointIndex];
    setDailyData(selectedWeek.items);
  }

  function cleanData() {
    setSelectedSheetsData(undefined);
    setDailyData(undefined);
    setCurrentCustomer(undefined);
    cleanSearchData();
  }

  return (
    <ComponentContainer cols="5" classToAdd="row-span-7 relative">
      {searchData && (
        <div className="absolute right-8 z-10">
          <CustomButton theme="attention" onClick={cleanData}>
            <SearchX className="size-5" />
            voltar tela
          </CustomButton>
        </div>
      )}
      {searchData ? (
        <div className="h-full">
          <ApexChart
            className="fade-left"
            type="bar"
            options={options}
            series={series}
            height={"100%"}
          />
        </div>
      ) : (
        <div className="w-full h-full inset-0 text-gray-500 font-heading flex items-center justify-center gap-2 fade-left">
          <Search className="size-4" />
          <span>Busque por um cliente </span>
        </div>
      )}
    </ComponentContainer>
  );
};

export default GoalsWeekly;
