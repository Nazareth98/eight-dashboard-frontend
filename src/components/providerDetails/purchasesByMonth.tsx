import { ApexOptions } from "apexcharts";
import { useContext, useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import { providersContext } from "../../contexts/providersContext";
import { formatCurrency, getWeekOfYear } from "../../utils/generalsUtils";
import ComponentContainer from "../shared/componentContainer";
import CustomButton from "../shared/customButton";
import { SearchX } from "lucide-react";

const PurchasesByMonth = () => {
  const { providerPurchases, cleanSearchData } = useContext(providersContext);

  const [chartLabels, setChartLabels] = useState([]);
  const [purchaseData, setPurchaseData] = useState<number[]>([]);
  const [paymentData, setPaymentData] = useState<number[]>([]);
  const [purchasesByMonth, setPurchasesByMonth] = useState([]);

  const options: ApexOptions = {
    colors: ["#45C93B", "#4A99F2"],

    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
      formatter: function (val) {
        return `$${formatCurrency(val)}`;
      },
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Visualização por mês",
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
          colors: "#C2CCC2", // Cor das labels do eixo Y
          fontSize: "12px",
        },
        show: true, // Remove as labels do eixo X
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          if (Number(val)) {
            return `$${formatCurrency(val)}`;
          } else {
            return `${val}`;
          }
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
      name: "Compras",
      data: purchaseData,
    },
    {
      name: "Pagamentos",
      data: paymentData,
    },
  ];

  useEffect(() => {
    if (providerPurchases) {
      const newLabels = [];
      const newPurchaseData = [];
      const newPaymentData = [];

      for (let i = 0; i < providerPurchases.length; i++) {
        newLabels.push(providerPurchases[i].month);
        newPurchaseData.push(providerPurchases[i].value);
        newPaymentData.push(providerPurchases[i].payments);
      }
      setPurchasesByMonth(providerPurchases);

      setChartLabels(newLabels);
      setPurchaseData(newPurchaseData);
      setPaymentData(newPaymentData);
    }
  }, [providerPurchases]);

  function cleanData() {
    cleanSearchData();
  }

  return (
    <ComponentContainer classToAdd="row-span-6 col-span-9 relative">
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
