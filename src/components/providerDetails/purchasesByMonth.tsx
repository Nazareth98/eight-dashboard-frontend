import { ApexOptions } from "apexcharts";
import { useContext, useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import { providersContext } from "../../contexts/providersContext";
import { formatCurrency, getWeekOfYear } from "../../utils/generalsUtils";
import ComponentContainer from "../shared/componentContainer";
import CustomButton from "../shared/customButton";
import { SearchX } from "lucide-react";

const PurchasesByMonth = ({ setSelectWeek }) => {
  const { providerPurchases, cleanSearchData } = useContext(providersContext);

  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [purchasesByMonth, setPurchasesByMonth] = useState([]);

  const options: ApexOptions = {
    colors: ["#45C93B"],
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      events: {
        dataPointSelection: handleBarClick,
        xAxisLabelClick: handleLabelClick,
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
      text: "Compras por mês",
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
        show: false, // Remove as labels do eixo X
      },
    },
    yaxis: {
      labels: {
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
      name: "Compras",
      data: chartData,
    },
  ];

  useEffect(() => {
    if (providerPurchases) {
      const newLabels = [];
      const newData = [];

      for (let i = 0; i < providerPurchases.length; i++) {
        newLabels.push(providerPurchases[i].month);
        newData.push(providerPurchases[i].value);
      }
      setPurchasesByMonth(providerPurchases);

      setChartLabels(newLabels);
      setChartData(newData);
    }
  }, [providerPurchases]);

  function handleBarClick(e, chart, options) {
    const selectIndex = options.dataPointIndex;
    const currentWeek = purchasesByMonth[selectIndex];
    console.log(currentWeek);
    if (currentWeek) {
      setSelectWeek(currentWeek);
    }
  }
  function handleLabelClick(e, chart, options) {
    const selectIndex = options.labelIndex;
    const currentWeek = purchasesByMonth[selectIndex];
    console.log(currentWeek);
    if (currentWeek) {
      setSelectWeek(currentWeek);
    }
  }

  function cleanData() {
    cleanSearchData();
  }

  return (
    <ComponentContainer classToAdd="row-span-7 col-span-5 relative">
      {providerPurchases && (
        <>
          <div className="absolute right-8 z-10">
            <CustomButton theme="attention" onClick={cleanData}>
              <SearchX className="size-5" />
              voltar tela
            </CustomButton>
          </div>
          <div className="h-full">
            <ApexChart
              className="fade-left"
              type="bar"
              options={options}
              series={series}
              height={"100%"}
            />
          </div>
        </>
      )}
    </ComponentContainer>
  );
};

export default PurchasesByMonth;
