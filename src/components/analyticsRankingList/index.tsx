import { useContext, useState } from "react";
import CustomSubtitle from "../shared/customSubtitle";
import IconOrders from "../../assets/svg/iconOrders";
import { analyticsContext } from "../../contexts/analyticsContext";
import { formatCurrency } from "../../utils/generalsUtils";
import ComponentContainer from "../shared/componentContainer";
import Loading from "../shared/loading";
import FeatureFlag from "../shared/featureFlag";
import { MousePointerClick } from "lucide-react";

const AnalyticsRankingList = () => {
  const { analyticsData, getAnalyticsById, selectCustomer } =
    useContext(analyticsContext);

  async function handleSelectCustomer({ currentTarget }) {
    const id = Number(currentTarget.id);
    const currentCustomer = analyticsData.find(
      (customer) => customer.customerId === id
    );
    selectCustomer(currentCustomer);
    console.log(analyticsData);
    await getAnalyticsById(id);
  }

  return (
    <ComponentContainer classToAdd="row-span-12 col-span-6">
      <CustomSubtitle
        icon={<IconOrders fill="fill-gray-600" width="25px" />}
        subtitle="Ranking por Pagamentos"
      />

      <div className="w-full inset-0 text-gray-500 font-heading flex items-center gap-2 fade-left">
        <MousePointerClick className="size-4" />
        <span>Selecione um Cliente</span>
      </div>

      {analyticsData ? (
        <div className="overflow-y-auto flex flex-col gap-4">
          {analyticsData.map((customer) => {
            return (
              <div
                id={customer.customerId.toString()}
                key={`${customer.customerId}-${customer.customerName}`}
                onClick={handleSelectCustomer}
                className="border-l-4 border-2 border-gray-900 border-l-primary-400 rounded grid grid-cols-12 p-1 gap-2 cursor-pointer transition-all fade-left hover:bg-gray-900 fade-left"
              >
                <div className="flex flex-col gap-2 p-1 col-span-2">
                  <span className="text-gray-500 text-xs font-semibold">
                    Nome
                  </span>
                  <p className="text-gray-100 text-sm font-heading">
                    {customer.customerName}
                  </p>
                </div>
                <div className="flex flex-col gap-2 p-1 col-span-2">
                  <span className="text-gray-500 text-xs font-semibold">
                    Total Pagamentos
                  </span>
                  <p
                    className={
                      "font-heading " +
                      (customer.amountPaid > 0
                        ? "text-primary-500 "
                        : customer.amountPaid < 0
                        ? "text-red-500"
                        : `text-gray-600`)
                    }
                  >
                    ${formatCurrency(customer.amountPaid)}
                  </p>
                </div>
                <div className="flex flex-col gap-2 p-1 col-span-2">
                  <span className="text-gray-500 text-xs font-semibold">
                    Total Vendas
                  </span>
                  <p
                    className={
                      "font-heading " +
                      (customer.amountPurchased > 0
                        ? "text-primary-500 "
                        : customer.amountPurchased < 0
                        ? "text-red-500"
                        : `text-gray-600`)
                    }
                  >
                    ${formatCurrency(customer.amountPurchased)}
                  </p>
                </div>
                <div className="flex flex-col gap-2 p-1 col-span-2">
                  <span className="text-gray-500 text-xs font-semibold">
                    Total Lucro
                  </span>
                  <p
                    className={
                      "font-heading " +
                      (customer.amountProfit > 0
                        ? "text-primary-500 "
                        : customer.amountProfit < 0
                        ? "text-red-500"
                        : `text-gray-600`)
                    }
                  >
                    ${formatCurrency(customer.amountProfit)}
                  </p>
                </div>
                <div className="flex flex-col gap-2 p-1 col-span-2">
                  <span className="text-gray-500 text-xs font-semibold">
                    Média de Atraso
                  </span>
                  <p className="text-gray-100 text-sm font-heading">
                    {customer.delayAverage} dias
                  </p>
                </div>
                <div className="flex flex-col gap-2 p-1 col-span-2">
                  <span className="text-gray-500 text-xs font-semibold">
                    Total de Pedidos
                  </span>
                  <p className="text-gray-100 text-sm font-heading">
                    {customer.totalOrders}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Loading />
      )}
    </ComponentContainer>
  );
};

export default AnalyticsRankingList;
