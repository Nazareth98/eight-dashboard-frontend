import React, { useContext, useEffect, useState } from "react";
import ComponentContainer from "../shared/componentContainer";
import CustomSubtitle from "../shared/customSubtitle";
import { DollarSign, FileText, UserCircle } from "lucide-react";
import { providersContext } from "../../contexts/providersContext";
import { formatCurrency } from "../../utils/generalsUtils";

const selectOptions = [
  { value: 0, label: "Todo o Período" },
  { value: 2024, label: "2024" },
  { value: 2023, label: "2023" },
  { value: 2023, label: "2022" },
];

const Resume = () => {
  const { providerPurchases, currentProvider, selectProvider } =
    useContext(providersContext);

  const [totalValue, setTotalSales] = useState<number>(0);
  const [totalPurchases, setTotalPurchases] = useState<number>(0);
  const [totalPayments, setTotalPayments] = useState<number>(0);
  const [averageValue, setAverageValue] = useState<number>(0);
  const [totalProducts, setTotalProducts] = useState<number | string>(0);
  const [mostPurchased, setMostPurchased] = useState<string>();
  const [period, setPeriod] = useState<number>(0);

  useEffect(() => {
    if (providerPurchases) {
      let sumValue = 0;
      let sumPurchases = 0;
      let sumPayments = 0;
      let sumProducts = 0;
      let productCounts: {
        [key: string]: { amount: number; description: string };
      } = {};
      let mostPurchasedProduct: string;

      providerPurchases.forEach((month) => {
        sumValue += month.value;
        sumPayments += month.payments;
        sumPurchases += month.purchases.length;
        month.purchases.forEach((purchase) => {
          purchase.products.forEach((product) => {
            sumProducts += product.amount;

            if (productCounts[product.description]) {
              productCounts[product.description].amount += product.amount;
            } else {
              productCounts[product.description] = {
                amount: product.amount,
                description: product.description,
              };
            }
          });
        });
      });

      let average = sumValue / sumPurchases;

      let maxAmount = 0;
      for (const [description, productData] of Object.entries(productCounts)) {
        if (productData.amount > maxAmount) {
          maxAmount = productData.amount;
          mostPurchasedProduct = description;
        }
      }

      setTotalPayments(sumPayments);
      setTotalSales(sumValue);
      setAverageValue(average);
      setTotalPurchases(sumPurchases);
      setTotalProducts(sumProducts.toLocaleString());
      setMostPurchased(mostPurchasedProduct);
    }
  }, [providerPurchases]);

  const handleChange = (event) => {
    setPeriod(Number(event.target.value));

    selectProvider(currentProvider, Number(event.target.value));
  };

  return (
    <ComponentContainer classToAdd="row-span-12 col-span-3">
      <div className="w-full flex justify-between">
        <CustomSubtitle subtitle="Resumo" />
        <select
          className="bg-gray-900 border-2 border-gray-800 text-gray-200 p-2 rounded"
          value={period}
          onChange={handleChange}
        >
          <option value="">Selecione um Trimestre</option>
          {selectOptions.map((option) => {
            return <option value={option.value}>{option.label}</option>;
          })}
        </select>
      </div>

      <div className="w-full h-full flex-1  flex items-center gap-2 fade-left">
        <UserCircle className="size-5 text-gray-600" />
        <h2 className="text-xl text-gray-300 font-heading font-semibold ">
          {currentProvider?.name}
        </h2>
      </div>
      <div className="w-full h-full flex flex-col items-start gap-4">
        <div className="w-full h-full flex-1 flex flex-col fade-left">
          <div className="flex items-center gap-2">
            <DollarSign className="size-4 text-gray-700" />
            <span className="w-1/2 text-gray-500 font-heading text-sm">
              Total de Compras
            </span>
          </div>
          <div className="w-full h-full flex items-end justify-end fade-right">
            <h2
              className={`text-4xl font-heading font-semibold ${
                totalValue > 0
                  ? "text-primary-500"
                  : totalValue < 0
                  ? "text-red-500"
                  : "text-gray-600"
              }`}
            >
              ${formatCurrency(totalValue)}
            </h2>
          </div>
        </div>
        <div className="w-24 m-auto h-[2px] bg-gray-900" />

        <div className="w-full h-full flex-1 flex flex-col fade-left">
          <div className="flex items-center gap-2">
            <DollarSign className="size-4 text-gray-700" />
            <span className="w-1/2 text-gray-500 font-heading text-sm">
              Total de Pagamentos
            </span>
          </div>
          <div className="w-full h-full flex items-end justify-end fade-right">
            <h2
              className={`text-4xl font-heading font-semibold ${
                totalValue > 0
                  ? "text-primary-500"
                  : totalValue < 0
                  ? "text-red-500"
                  : "text-gray-600"
              }`}
            >
              ${formatCurrency(totalPayments)}
            </h2>
          </div>
        </div>

        <div className="w-24 m-auto h-[2px] bg-gray-900" />
        <div className="w-full h-full flex-1 flex flex-col">
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-gray-700" />
            <span className="w-1/2 text-gray-500 font-heading text-sm">
              Qtde notas
            </span>
          </div>
          <div className="w-full h-full flex items-end justify-end fade-right">
            <h2 className="text-xl font-heading font-semibold text-gray-200">
              {totalPurchases}
            </h2>
          </div>
        </div>

        <div className="w-24 m-auto h-[2px] bg-gray-900" />
        <div className="w-full h-full flex-1 flex flex-col">
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-gray-700" />
            <span className="w-1/2 text-gray-500 font-heading text-sm">
              Valor médio
            </span>
          </div>
          <div className="w-full h-full flex items-end justify-end fade-right">
            <h2 className="text-xl font-heading font-semibold text-gray-200">
              ${formatCurrency(averageValue)}
            </h2>
          </div>
        </div>

        <div className="w-24 m-auto h-[2px] bg-gray-900" />
        <div className="w-full h-full flex-1 flex flex-col">
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-gray-700" />
            <span className="w-1/2 text-gray-500 font-heading text-sm">
              Total de produtos
            </span>
          </div>
          <div className="w-full h-full flex items-end justify-end fade-right">
            <h2 className="text-xl font-heading font-semibold text-gray-200">
              {totalProducts} un
            </h2>
          </div>
        </div>
        <div className="w-24 m-auto h-[2px] bg-gray-900" />
        <div className="w-full h-full flex-1 flex flex-col">
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-gray-700" />
            <span className="w-1/2 text-gray-500 font-heading text-sm">
              Mais Comprado
            </span>
          </div>
          <div className="w-full h-full flex items-end justify-end fade-right">
            <h2 className="text-xl font-heading font-semibold text-gray-200">
              {mostPurchased || "-"}
            </h2>
          </div>
        </div>
      </div>
    </ComponentContainer>
  );
};

export default Resume;
