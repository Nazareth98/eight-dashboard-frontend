import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/generalsUtils";
import ApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { PaymentType } from "../../types/paymentType";
import { Search } from "lucide-react";

const getWeekOfYear = (date) => {
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
  data: PaymentType[];
  setDailyData: React.Dispatch<React.SetStateAction<PaymentType[]>>;
}

const GoalsWeekly = ({ data, setDailyData }: GoalsWeeklyProps) => {
  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [resultData, setResultData] = useState([]);

  useEffect(() => {
    if (data) {
      console.log(data);
      const groupedByWeek = data.reduce((acc, item) => {
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
  }, [data]);

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

  return (
    <div className="col-span-5 row-span-6 p-6 rounded-xl border-2 border-gray-900 flex flex-col gap-4 fade-left">
      {data ? (
        <ApexChart
          className="fade-left"
          type="bar"
          options={options}
          series={series}
        />
      ) : (
        <div className="w-full h-full inset-0 text-gray-500 font-heading flex items-center justify-center gap-2 fade-left">
          <Search className="size-4" />
          <span>Busque por um cliente </span>
        </div>
      )}
    </div>
  );
};

export default GoalsWeekly;
