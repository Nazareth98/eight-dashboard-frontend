import { ApexOptions } from "apexcharts";
import { Calendar, Search } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import { productAnalysisContext } from "../../contexts/productsAnalysisContext";
import { formatCurrency } from "../../utils/generalsUtils";
import ComponentContainer from "../shared/componentContainer";
import CustomButton from "../shared/customButton";
import CustomInput from "../shared/customInput";
import ModalTable from "./modalTable";

const selectOptions = [
  { value: 1, label: "1° Trimestre" },
  { value: 2, label: "2° Trimestre" },
  { value: 3, label: "3° Trimestre" },
  { value: 4, label: "4° Trimestre" },
];

const TopSellingProducts = () => {
  const { getSalesByDate, salesByProduct } = useContext(productAnalysisContext);

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any[]>();
  const [valueData, setValueData] = useState<number[]>();
  const [amountData, setAmountData] = useState<number[]>();
  const [labels, setLabels] = useState<string[]>();
  const [selectYear, setSelectYear] = useState<number>(0);
  const [selectedQuarter, setSelectedQuarter] = useState<number>();

  function updateChartData(sales) {
    const newDataValue = [];
    const newDataAmount = [];
    const newLabels = [];

    if (sales.length > 0) {
      for (let i = 0; i < 10; i++) {
        newLabels.push(sales[i].description);
        newDataValue.push(sales[i].saleValue);
        newDataAmount.push(sales[i].amount);
      }
    }
    setValueData(newDataValue);
    setAmountData(newDataAmount);
    setLabels(newLabels);
  }

  useEffect(() => {
    async function loadData() {
      const currentDate = new Date();
      const year = `${currentDate.getFullYear()}`;
      const month = currentDate.getMonth() + 1;
      const quarter = Math.ceil(month / 3);

      setSelectedQuarter(quarter);
      setSelectYear(currentDate.getFullYear());
      getSalesByDate(quarter.toString(), year);
    }

    loadData();
  }, []);

  useEffect(() => {
    if (salesByProduct) {
      updateChartData(salesByProduct);
    }
  }, [salesByProduct]);

  const options: ApexOptions = {
    colors: ["#45C93B", "#4A99F2", "#CEAF09"],
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
      name: "Quantidade",
      type: "bar",
      data: amountData,
    },
  ];

  async function handleSearch() {
    if (!selectedQuarter) {
      alert("É necessário selecionar um trimestre.");
      return;
    }

    if (!selectYear) {
      alert("É necessário selecionar um ano.");
      return;
    }
    const month =
      selectedQuarter > 10 ? `${selectedQuarter}` : `0${selectedQuarter}`;
    const year = `${selectYear}`;
    await getSalesByDate(month, year);
  }

  function handleClick() {
    setModalData(salesByProduct);
    setModalIsOpen(true);
  }

  const handleChange = (event) => {
    setSelectedQuarter(event.target.value);
  };

  return (
    <ComponentContainer classToAdd="row-span-6 col-span-9 relative">
      <ModalTable
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        modalData={modalData}
      />
      {valueData ? (
        <>
          <div className="w-[400px]  absolute flex gap-2 right-8 z-10">
            <select
              className="bg-gray-900 border-2 border-gray-800 text-gray-200 px-2 rounded "
              value={selectedQuarter}
              onChange={handleChange}
            >
              <option value="">Selecione um Trimestre</option>
              {selectOptions.map((option) => {
                return <option value={option.value}>{option.label}</option>;
              })}
            </select>
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
        <>
          <div className="w-80 absolute flex gap-2 right-8 z-10">
            <select
              className="bg-gray-900 border-2 border-gray-800 text-gray-200 px-2 rounded "
              value={selectedQuarter}
              onChange={handleChange}
            >
              <option value="">Selecione um Trimestre</option>
              {selectOptions.map((option) => {
                return <option value={option.value}>{option.label}</option>;
              })}
            </select>
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
        </>
      )}
    </ComponentContainer>
  );
};
export default TopSellingProducts;
