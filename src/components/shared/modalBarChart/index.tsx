import React from "react";

import ApexChart from "react-apexcharts";
import Modal from "react-modal";
Modal.setAppElement("#root");

interface ModalBarChartProps {
  isOpen: boolean;
  closeModal: () => void;
  color: string;
  handleBarClick: (event: any, chartContext: any, config: any) => void;
}

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
    backgroundColor: "#1E1F1E",
    border: "none",
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    borderRadius: ".5rem",
  },
};

const ModalBarChart = (props: ModalBarChartProps) => {
  const options = {};
  const series = [];

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.closeModal}
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

export default ModalBarChart;
