import React, { useContext, useEffect, useState } from "react";
import ComponentContainer from "../shared/componentContainer";
import CustomInput from "../shared/customInput";
import CustomButton from "../shared/customButton";
import { Calendar, List, Search } from "lucide-react";
import Loading from "../shared/loading";
import ApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { productAnalysisContext } from "../../contexts/productsAnalysisContext";
import { formatCurrency } from "../../utils/generalsUtils";
import ModalTable from "./modalTable";

const TopSellingProducts = () => {
  const { getSalesByDate, salesByProduct } = useContext(productAnalysisContext);

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any[]>();

  const [valueData, setValueData] = useState<number[]>();
  const [profitData, setProfitData] = useState<number[]>();
  const [amountData, setAmountData] = useState<number[]>();

  const [labels, setLabels] = useState<string[]>();

  const [selectMonth, setSelectMonth] = useState<number>(0);
  const [selectYear, setSelectYear] = useState<number>(0);

  function updateChartData(sales) {
    const newDataValue = [];
    const newDataProfit = [];
    const newDataAmount = [];

    const newLabels = [];
    for (let i = 0; i < 10; i++) {
      // limitado a 10 itens no gráfico
      newLabels.push(sales[i].description);
      newDataValue.push(sales[i].saleValue);
      newDataProfit.push(sales[i].profitValue);
      newDataAmount.push(sales[i].amount);
    }
    setValueData(newDataValue);
    setProfitData(newDataProfit);
    setAmountData(newDataAmount);
    setLabels(newLabels);
  }

  useEffect(() => {
    if (salesByProduct) {
      updateChartData(salesByProduct);
    }
  }, [salesByProduct]);

  useEffect(() => {
    async function loadData() {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const month = currentMonth > 10 ? `${currentMonth}` : `0${currentMonth}`;
      const year = `${currentDate.getFullYear()}`;
      setSelectMonth(currentMonth);
      setSelectYear(currentDate.getFullYear());
      await getSalesByDate(month, year);
    }

    loadData();
  }, []);

  const options: ApexOptions = {
    colors: ["#4A99F2", "#45C93B", "#CEAF09"],
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
        horizontal: true, // Configuração para barras horizontais
        borderRadius: 0, // Remove bordas arredondadas
        columnWidth: "60%", // Ajusta a largura das colunas
        dataLabels: {
          position: "top", // Posição das labels no topo das barras
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false, // Remove a borda das barras
    },
    title: {
      text: "Top 10 Produtos",
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
    labels: labels,
    xaxis: {
      type: "category",
      labels: {
        formatter: function (val) {
          return `$${formatCurrency(val)}`;
        },
        style: {
          colors: "#C2CCC2", // Cor das labels do eixo X
          fontSize: "12px",
        },
      },
    },
    yaxis: [
      {
        labels: {
          style: {
            colors: "#C2CCC2",
            fontSize: "12px",
          },
        },
      },
    ],
    legend: {
      horizontalAlign: "left",
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: [
        {
          formatter: function (val) {
            return `$${formatCurrency(val)}`;
          },
        },
        {
          formatter: function (val) {
            return `$${formatCurrency(val)}`;
          },
        },
        {
          formatter: function (val) {
            return `${val.toLocaleString()} un`;
          },
        },
      ],
    },
  };

  const series: ApexAxisChartSeries = [
    {
      name: "Valor",
      type: "bar",
      data: valueData,
    },
    {
      name: "Lucro",
      type: "bar",
      data: profitData,
    },
    {
      name: "Quantidade",
      type: "bar",
      data: amountData,
    },
  ];

  async function handleSearch() {
    if (!selectMonth) {
      alert("É necessário selecionar um mês.");
      return;
    }

    if (!selectYear) {
      alert("É necessário selecionar um ano.");
      return;
    }

    const month = selectMonth > 10 ? `${selectMonth}` : `0${selectMonth}`;
    const year = `${selectYear}`;
    await getSalesByDate(month, year);
  }

  function handleClick(event) {
    setModalData(salesByProduct);
    setModalIsOpen(true);
  }

  return (
    <ComponentContainer classToAdd="row-span-6 col-span-9 relative">
      <ModalTable
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        modalData={modalData}
      />
      {valueData ? (
        <>
          <div className="w-80 absolute flex gap-2 right-8 z-10">
            <CustomInput
              type="number"
              min="1"
              max="12"
              placeholder="MM"
              inputValue={selectMonth}
              setValue={setSelectMonth}
              icon={<Calendar className="size-5 text-gray-700" />}
            />
            <CustomInput
              type="number"
              min="2000"
              max="2100"
              placeholder="AAAA"
              inputValue={selectYear}
              setValue={setSelectYear}
              icon={<Calendar className="size-5 text-gray-700" />}
            />
            <CustomButton onClick={handleSearch}>
              <Search className="size-4" />
            </CustomButton>
          </div>
          <div className="h-full">
            <ApexChart
              onClick={handleClick}
              className="cursor-pointer"
              type="bar"
              options={options}
              series={series}
              height={"100%"}
            />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </ComponentContainer>
  );
};
export default TopSellingProducts;
