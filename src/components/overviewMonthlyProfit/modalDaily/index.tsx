import React, { useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import Modal from "react-modal";
Modal.setAppElement("#root");

import { formatCurrency } from "../../../utils/generalsUtils";

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

const ModalDaily = ({ isOpen, setIsOpen, data }) => {
  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data) {
      const newLabels = [];
      const newData = [];

      for (let i = 0; i < data.length; i++) {
        newLabels.push(data[i].label);
        newData.push(data[i].value);
      }

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
      text: "Lucro Por dia",
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

export default ModalDaily;
