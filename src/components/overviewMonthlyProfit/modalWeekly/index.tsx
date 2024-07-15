import { useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import Modal from "react-modal";
import { formatCurrency } from "../../../utils/generalsUtils";
import ModalDaily from "../modalDaily";
Modal.setAppElement("#root");

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

const parseDate = (dateString) => {
  const [day, month, year] = dateString.split("/");
  return new Date(`${year}-${month}-${day}`);
};

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  content: {
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

const ModalWeekly = ({ isOpen, setIsOpen, data }) => {
  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dailyData, setDailyData] = useState([]);

  const [resultData, setResultData] = useState([]);

  async function handleBarClick(event, chartContext, config) {
    const selectedWeek = resultData[config.dataPointIndex];
    setDailyData(selectedWeek.items);
    setModalIsOpen(true);
  }

  useEffect(() => {
    if (data) {
      const groupedByWeek = data.reduce((acc, item) => {
        const week = getWeekOfYear(item.label);
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
      text: "Lucro por semana",
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
      name: "Lucro",
      data: chartData,
    },
  ];

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <ModalDaily
        data={dailyData}
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
      />
      <ApexChart
        type="bar"
        options={options}
        series={series}
        height={"400px"}
        width={"800px"}
      />
    </Modal>
  );
};

export default ModalWeekly;
