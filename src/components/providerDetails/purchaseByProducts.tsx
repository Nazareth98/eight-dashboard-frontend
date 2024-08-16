import { useContext, useEffect, useState } from "react";
import ComponentContainer from "../shared/componentContainer";
import CustomSubtitle from "../shared/customSubtitle";
import { FileText } from "lucide-react";
import { providersContext } from "../../contexts/providersContext";
import { ApexOptions } from "apexcharts";
import ApexChart from "react-apexcharts";
import { formatCurrency } from "../../utils/generalsUtils";

const PurchaseByProducts = () => {
  const { providerPurchases } = useContext(providersContext);

  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (providerPurchases) {
      const productTotals = {};

      providerPurchases.forEach((purchase) => {
        purchase.products.forEach((product) => {
          if (!productTotals[product.description]) {
            productTotals[product.description] = 0;
          }
          productTotals[product.description] += product.amount;
        });
      });

      const sortedProducts = Object.entries(productTotals)
        .map(([description, total]) => ({ description, total }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 10);

      setChartLabels(sortedProducts.map((product) => product.description));
      setChartData(sortedProducts.map((product) => product.total));
    }
  }, [providerPurchases]);

  const options: ApexOptions = {
    chart: {
      type: "pie",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
      formatter: function (val) {
        return `${val} unidades`;
      },
    },
    title: {
      text: "10 Produtos Mais Comprados",
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#ffffff",
      },
    },
    subtitle: {
      text: "Quantidade total vendida",
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
    <ComponentContainer classToAdd="row-span-5 col-span-5">
      <div className="h-full">
        <ApexChart
          className="fade-left"
          type="polarArea"
          options={options}
          series={series}
          height={"100%"}
        />
      </div>
    </ComponentContainer>
  );
};

export default PurchaseByProducts;
