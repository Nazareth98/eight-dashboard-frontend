import { PaymentType } from "../../types/paymentType";
import { MousePointerClick, Search } from "lucide-react";
import { formatCurrency } from "../../utils/generalsUtils";
import { useContext, useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import ComponentContainer from "../shared/componentContainer";
import { customerContext } from "../../contexts/customerContext";
import { goalsContext } from "../../contexts/goalsContext";

interface GoalsDailyProps {
  dailyData: PaymentType[];
}

const GoalsDaily = ({ dailyData }: GoalsDailyProps) => {
  const { searchData } = useContext(goalsContext);

  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (dailyData) {
      const newLabels = [];
      const newData = [];

      for (let i = 0; i < dailyData.length; i++) {
        newLabels.push(dailyData[i].payDay);
        newData.push(dailyData[i].value);
      }

      setChartLabels(newLabels);
      setChartData(newData);
    }
  }, [dailyData]);

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
        return `$${formatCurrency(val)}`;
      },
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Pagamentos por dia",
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

  return (
    <ComponentContainer cols="4" classToAdd="row-span-7">
      {!searchData && !dailyData && (
        <div className="w-full h-full inset-0 text-gray-500 font-heading flex items-center justify-center gap-2 fade-left">
          <Search className="size-4" />
          <span>Busque por um cliente </span>
        </div>
      )}

      {searchData && !dailyData && (
        <div className="w-full h-full inset-0 text-gray-500 font-heading flex items-center justify-center gap-2 fade-left">
          <MousePointerClick className="size-4" />
          <span>Selecione um semana</span>
        </div>
      )}

      {searchData && dailyData && (
        <div className="h-full">
          <ApexChart
            type="bar"
            className="fade-left"
            options={options}
            series={series}
            height={"100%"}
          />
        </div>
      )}
    </ComponentContainer>
  );
};

export default GoalsDaily;
