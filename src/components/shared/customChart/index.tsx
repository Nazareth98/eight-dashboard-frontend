import ApexChart from "react-apexcharts";

const CustomAreaChart = ({ options, series }) => {
  return (
    <ApexChart
      type="area"
      options={options}
      series={series}
      height={"400px"}
      width={"800px"}
    />
  );
};

export default CustomAreaChart;
