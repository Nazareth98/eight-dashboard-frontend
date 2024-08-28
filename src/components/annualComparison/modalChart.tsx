import React, { useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import Modal from "react-modal";
import { formatCurrency } from "../../utils/generalsUtils";
import { ApexOptions } from "apexcharts";
import Loading from "../shared/loading";

Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  content: {
    width: "900px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    alignItems: "center",
    padding: "40px",
    backgroundColor: "#131413",
    border: "none",
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    borderRadius: ".5rem",
  },
};

// Tipo para os dados do gráfico
interface ChartDataItem {
  date: string; // No formato "MM-YYYY"
  value: number;
}

// Props do ModalChart
interface ModalChartProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  data: ChartDataItem[];
  title: string;
}

const ModalChart: React.FC<ModalChartProps> = ({
  isOpen,
  setIsOpen,
  data,
  title,
}) => {
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [data2022, setData2022] = useState<number[]>([]);
  const [data2023, setData2023] = useState<number[]>([]);
  const [data2024, setData2024] = useState<number[]>([]);

  useEffect(() => {
    if (!data) return;

    const processData = (data: ChartDataItem[]) => {
      const result: Record<string, { year: string; value: number }[]> = {};
      data.forEach(({ date, value }) => {
        const [month, year] = date.split("-");
        if (!result[month]) {
          result[month] = [];
        }
        result[month].push({ year, value });
      });

      const months = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];
      const chartData2022 = [];
      const chartData2023 = [];
      const chartData2024 = [];
      const labels = months;

      months.forEach((month) => {
        const values = result[month] || [];
        const value2022 = values.find((v) => v.year === "2022")?.value || 0;
        const value2023 = values.find((v) => v.year === "2023")?.value || 0;
        const value2024 = values.find((v) => v.year === "2024")?.value || 0;

        chartData2022.push(value2022);
        chartData2023.push(value2023);
        chartData2024.push(value2024);
      });

      return { labels, chartData2022, chartData2023, chartData2024 };
    };

    const { labels, chartData2022, chartData2023, chartData2024 } =
      processData(data);

    setChartLabels(labels);
    setData2022(chartData2022);
    setData2023(chartData2023);
    setData2024(chartData2024);
  }, [data]);

  const closeModal = () => setIsOpen(false);

  const options: ApexOptions = {
    colors: ["#CEAF09", "#4A99F2", "#45C93B"],
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        columnWidth: "60%",
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
    title: {
      text: `Comparativo Anual - ${title}`,
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#ffffff",
      },
    },
    subtitle: {
      text: "Valores em dólar americano",
      align: "left",
      style: {
        fontSize: "12px",
        color: "#cccccc",
      },
    },
    labels: chartLabels,
    xaxis: {
      type: "category",
      labels: {
        formatter: function (val) {
          return `Mês ${val}`;
        },
        style: {
          colors: "#C2CCC2",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return `$${formatCurrency(val)}`;
        },
        style: {
          colors: "#C2CCC2",
          fontSize: "12px",
        },
      },
    },
    legend: {
      horizontalAlign: "left",
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  const series = [
    {
      name: "2022",
      type: "bar",
      data: data2022,
    },
    {
      name: "2023",
      type: "bar",
      data: data2023,
    },
    {
      name: "2024",
      type: "bar",
      data: data2024,
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Gráfico Modal"
    >
      {data ? (
        <div className="h-full w-full">
          <ApexChart
            type="bar"
            options={options}
            series={series}
            height={"500px"}
          />
        </div>
      ) : (
        <Loading />
      )}
    </Modal>
  );
};

export default ModalChart;
