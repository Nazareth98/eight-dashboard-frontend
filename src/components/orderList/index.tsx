import { List, RefreshCcw } from "lucide-react";
import { useContext, useState } from "react";
import { orderContext } from "../../contexts/orderContext";
import { formatCurrency } from "../../utils/generalsUtils";
import ComponentContainer from "../shared/componentContainer";
import CustomButton from "../shared/customButton";
import CustomSubtitle from "../shared/customSubtitle";
import Loading from "../shared/loading";

const OrderList = ({ setSelectOrder, selectOrder }) => {
  const { orderData, getOrderById, refreshData } = useContext(orderContext);

  const [isLoading, setIsLoading] = useState(false);

  async function handleSelectOrder({ currentTarget }) {
    const id = Number(currentTarget.id);
    const order = await getOrderById(id);
    setSelectOrder(order);
  }

  async function handleRefresh() {
    setIsLoading(true);
    try {
      const response = await refreshData();
      if (response.status !== 200) {
        alert(response.message);
        return;
      }
      setTimeout(() => setIsLoading(false), 300);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <ComponentContainer cols="7" rows="12">
      <CustomSubtitle
        icon={<List className="size-6 text-gray-700" />}
        subtitle="Todos os pedidos"
      />

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="h-full overflow-y-auto flex flex-col gap-4 pr-4">
            {orderData?.map((order) => {
              return (
                <div
                  id={order.id}
                  className={`border-l-4 border-2 border-gray-900 border-l-primary-400 rounded grid grid-cols-12 p-1 gap-2 transition-all fade-left hover:bg-gray-900 active:bg-gray-950 cursor-pointer fade-left ${
                    selectOrder?.id === order.id
                      ? "border-primary-400"
                      : "hover:bg-gray-800"
                  }`}
                  onClick={handleSelectOrder}
                >
                  <div className="flex flex-col gap-2 p-2 col-span-1">
                    <span className={`text-gray-500 text-xs font-semibold`}>
                      Nota
                    </span>
                    <p className="text-gray-100 text-sm font-heading">
                      {order.id}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 p-2 col-span-2">
                    <span className={`text-gray-500 text-xs font-semibold`}>
                      Total
                    </span>
                    <p className="text-primary-400 text-sm font-heading">
                      ${formatCurrency(order.total)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 p-2 col-span-1">
                    <span className={`text-gray-500 text-xs font-semibold`}>
                      ID
                    </span>
                    <p className="text-gray-100 text-sm font-heading">
                      {order.customerId}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 p-2 col-span-3">
                    <span className={`text-gray-500 text-xs font-semibold`}>
                      Cliente
                    </span>
                    <p className="text-gray-100 text-sm font-heading">
                      {order.customer}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 p-2 col-span-2">
                    <span className={`text-gray-500 text-xs font-semibold`}>
                      Status
                    </span>
                    <p
                      className={
                        order.status === 9
                          ? "text-gray-100 text-sm font-heading"
                          : "text-yellow-400 text-sm font-heading"
                      }
                    >
                      {order.status === 9 ? "Faturado" : "Pendente"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 p-2 col-span-2">
                    <span className={`text-gray-500 text-xs font-semibold`}>
                      Grupo
                    </span>
                    <p
                      className={
                        order.status === 9
                          ? "text-gray-100 text-sm font-heading"
                          : "text-yellow-400 text-sm font-heading"
                      }
                    >
                      {order.group ? order.group.name : "-"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 p-2 col-span-1">
                    <span className={`text-gray-500 text-xs font-semibold`}>
                      Enviado
                    </span>
                    <p
                      className={
                        order.wasSent === 0
                          ? "text-red-400 text-sm font-heading"
                          : "text-primary-400 text-sm font-heading"
                      }
                    >
                      {order.wasSent === 0 ? "Não" : "Sim"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="w-full flex items-end justify-end">
            <CustomButton theme="attention" onClick={handleRefresh}>
              <RefreshCcw className="size-4" />
              atualizar
            </CustomButton>
          </div>
        </>
      )}
    </ComponentContainer>
  );
};

export default OrderList;
