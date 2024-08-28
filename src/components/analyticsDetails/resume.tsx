import React, { useContext, useEffect, useState } from "react";
import { analyticsContext } from "../../contexts/analyticsContext";
import CustomSubtitle from "../shared/customSubtitle";
import ComponentContainer from "../shared/componentContainer";
import { DollarSign, FileText, SearchX, UserCircle } from "lucide-react";
import { formatCurrency } from "../../utils/generalsUtils";
import CustomButton from "../shared/customButton";

const Resume = () => {
  const { currentCustomer, customerDetails, selectCustomer } =
    useContext(analyticsContext);

  const [totalValue, setTotalSales] = useState<number>(0);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [averageValue, setAverageValue] = useState<number>(0);
  const [totalProducts, setTotalProducts] = useState<number | string>(0);
  const [mostPurchased, setMostPurchased] = useState<string>();

  useEffect(() => {
    if (customerDetails) {
      console.log(customerDetails);
      let sumValue = 0;
      let sumOrders = customerDetails.length;
      let sumProducts = 0;
      let productCounts: {
        [key: string]: { amount: number; description: string };
      } = {};
      let mostPurchasedProduct: string;
      customerDetails.forEach((order) => {
        sumValue += order.amountPaid;
        order.products.forEach((product) => {
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
      let average = sumValue / sumOrders;
      let maxAmount = 0;
      for (const [description, productData] of Object.entries(productCounts)) {
        if (productData.amount > maxAmount) {
          maxAmount = productData.amount;
          mostPurchasedProduct = description;
        }
      }
      setTotalSales(sumValue);
      setAverageValue(average);
      setTotalOrders(sumOrders);
      setTotalProducts(sumProducts.toLocaleString());
      setMostPurchased(mostPurchasedProduct);
    }
  }, [customerDetails]);

  function cleanData() {
    selectCustomer(undefined);
  }

  return (
    <ComponentContainer classToAdd="row-span-12 col-span-3 relative">
      <div className="absolute right-4 z-10">
        <CustomButton theme="attention" onClick={cleanData}>
          <SearchX className="size-5" />
          voltar tela
        </CustomButton>
      </div>
      <CustomSubtitle subtitle="Resumo" />
      <div className="w-full h-full flex-1  flex items-center gap-2 fade-left">
        <UserCircle className="size-5 text-gray-600" />
        <h2 className="text-xl text-gray-300 font-heading font-semibold ">
          {currentCustomer.customerName}
        </h2>
      </div>
      <div className="w-full h-full flex flex-col items-start gap-4">
        <div className="w-full h-full flex-1 flex flex-col fade-left">
          <div className="flex items-center gap-2">
            <DollarSign className="size-4 text-gray-700" />
            <span className="w-1/2 text-gray-500 font-heading text-sm">
              Total Compras
            </span>
          </div>
          <div className="w-full h-full flex items-end justify-end fade-right">
            <h2
              className={`text-4xl font-heading font-semibold ${
                currentCustomer.amountPurchased > 0
                  ? "text-primary-500"
                  : currentCustomer.amountPurchased < 0
                  ? "text-red-500"
                  : "text-gray-600"
              }`}
            >
              ${formatCurrency(currentCustomer.amountPurchased)}
            </h2>
          </div>
        </div>

        <div className="w-full h-full flex-1 flex flex-col fade-left">
          <div className="flex items-center gap-2">
            <DollarSign className="size-4 text-gray-700" />
            <span className="w-1/2 text-gray-500 font-heading text-sm">
              Total Pagamentos
            </span>
          </div>
          <div className="w-full h-full flex items-end justify-end fade-right">
            <h2
              className={`text-4xl font-heading font-semibold ${
                currentCustomer.amountPaid > 0
                  ? "text-primary-500"
                  : currentCustomer.amountPaid < 0
                  ? "text-red-500"
                  : "text-gray-600"
              }`}
            >
              ${formatCurrency(currentCustomer.amountPaid)}
            </h2>
          </div>
        </div>

        <div className="w-24 m-auto h-[2px] bg-gray-900" />
        <div className="w-full h-full flex-1 flex flex-col">
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-gray-700" />
            <span className="w-1/2 text-gray-500 font-heading text-sm">
              Média Atraso
            </span>
          </div>
          <div className="w-full h-full flex items-end justify-end fade-right">
            <h2 className="text-xl font-heading font-semibold text-gray-200">
              {currentCustomer.delayAverage} dias
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
