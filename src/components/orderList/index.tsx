import CustomSubtitle from "../shared/customSubtitle";
import IconOrders from "../../assets/svg/iconOrders";
import { useContext, useState } from "react";
import { orderContext } from "../../contexts/orderContext";
import CustomButton from "../shared/customButton";
import IconRefresh from "../../assets/svg/iconRefresh";
import { formatCurrency } from "../../utils/generalsUtils";
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
    <div className="h-[52rem] col-span-7 row-span-12 bg-gray-900 p-6 rounded-xl border-2 border-gray-800 flex flex-col gap-4">
      <CustomSubtitle
        icon={<IconOrders fill="fill-primary-400" width="25px" />}
        subtitle="Todos os pedidos"
      />

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="overflow-y-auto flex flex-col gap-4 pr-4">
            {orderData?.map((order) => {
              return (
                <div
                  id={order.id}
                  className={`border-2 rounded grid grid-cols-12 gap-2 cursor-pointer transition-all  ${
                    selectOrder?.id === order.id
                      ? "border-primary-400 bg-primary-950 hover:bg-primary-950"
                      : "border-gray-950 bg-gray-950 hover:bg-gray-800"
                  }`}
                  onClick={handleSelectOrder}
                >
                  <div className="flex flex-col gap-2 p-2 col-span-1">
                    <span className={`text-gray-500 text-xs font-semibold`}>
                      Nota
                    </span>
                    <p className="text-gray-100 text-sm">{order.id}</p>
                  </div>
                  <div className="flex flex-col gap-2 p-2 col-span-2">
                    <span className={`text-gray-500 text-xs font-semibold`}>
                      Total
                    </span>
                    <p className="text-primary-400 text-sm">
                      ${formatCurrency(order.total)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 p-2 col-span-1">
                    <span className={`text-gray-500 text-xs font-semibold`}>
                      ID
                    </span>
                    <p className="text-gray-100 text-sm">{order.customerId}</p>
                  </div>
                  <div className="flex flex-col gap-2 p-2 col-span-3">
                    <span className={`text-gray-500 text-xs font-semibold`}>
                      Cliente
                    </span>
                    <p className="text-gray-100 text-sm">{order.customer}</p>
                  </div>
                  <div className="flex flex-col gap-2 p-2 col-span-2">
                    <span className={`text-gray-500 text-xs font-semibold`}>
                      Status
                    </span>
                    <p
                      className={
                        order.status === 9
                          ? "text-gray-100 text-sm"
                          : "text-yellow-400 text-sm"
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
                          ? "text-gray-100 text-sm"
                          : "text-yellow-400 text-sm"
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
                          ? "text-red-400 text-sm"
                          : "text-primary-400 text-sm"
                      }
                    >
                      {order.wasSent === 0 ? "Não" : "Sim"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="w-full h-full flex items-end justify-end">
            <CustomButton type="attention" onClick={handleRefresh}>
              <IconRefresh fill="fill-yellow-600" />
              Atualizar
            </CustomButton>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderList;
