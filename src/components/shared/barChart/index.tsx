import ApexChart from "react-apexcharts";

const CustomBarChart = ({ options, series }) => {
  return (
    <ApexChart
      type="bar"
      options={options}
      series={series}
      height={"400px"}
      width={"800px"}
    />
  );
};

export default CustomBarChart;
