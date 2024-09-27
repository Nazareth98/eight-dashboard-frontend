import { ApexOptions } from "apexcharts";
import { useContext, useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import { providersContext } from "../../contexts/providersContext";
import ComponentContainer from "../shared/componentContainer";

const PurchasesByBrand = () => {
  const { providerPurchases } = useContext(providersContext);

  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!providerPurchases) return;

    const productTotals = providerPurchases.reduce((acc, month) => {
      month.purchases.forEach((purchase) => {
        purchase.products.forEach((product) => {
          acc[product.brand] = (acc[product.brand] || 0) + product.amount;
        });
      });
      return acc;
    }, {});

    const sortedProducts = Object.entries(productTotals)
      .map(([description, total]) => ({ description, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);

    setChartLabels(sortedProducts.map((product) => product.description));
    setChartData(sortedProducts.map((product) => product.total));
  }, [providerPurchases]);

  const options: ApexOptions = {
    chart: {
      type: "pie",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false, // Desabilita a exibição dos rótulos diretamente no gráfico
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (val) {
          return `${val.toLocaleString()} peças`;
        },
      },
    },
    title: {
      text: "Ranking por Marca",
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#ffffff",
      },
    },
    subtitle: {
      text: "Total de peças compradas",
      align: "left",
      style: {
        fontSize: "12px",
        color: "#cccccc",
      },
    },
    labels: chartLabels,
    legend: {
      labels: {
        colors: "#bbb",
      },
    },
  };

  const series = chartData;

  return (
    <ComponentContainer classToAdd="row-span-6 col-span-4">
      <div className="h-full">
        <ApexChart
          className="fade-left"
          type="pie"
          options={options}
          series={series}
          height={"100%"}
        />
      </div>
    </ComponentContainer>
  );
};

export default PurchasesByBrand;
