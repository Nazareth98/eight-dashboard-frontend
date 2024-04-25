import CustomSubtitle from "../shared/customSubtitle";
import IconOrders from "../../assets/svg/iconOrders";
import { useContext } from "react";
import { orderContext } from "../../contexts/orderContext";

const OrderList = ({ onSelect }) => {
  const { orderData } = useContext(orderContext);

  return (
    <div className="col-span-6 row-span-12 bg-gray-900 p-4 rounded-sm border-2 border-gray-800 flex flex-col gap-4">
      <CustomSubtitle
        icon={<IconOrders fill="fill-primary-400" width="25px" />}
        subtitle="Todos os pedidos"
      />
      {orderData && (
        <div className="overflow-y-auto flex flex-col gap-4 pr-4">
          {orderData.map((order) => {
            return (
              <div
                id={order.id}
                className="bg-gray-950 rounded grid grid-cols-12 gap-2 cursor-pointer transition-all hover:bg-gray-800"
                onClick={onSelect}
              >
                <div className="flex flex-col gap-2 p-2 col-span-1">
                  <span className="text-gray-500 text-xs font-semibold">
                    Nota
                  </span>
                  <p className="text-gray-100 text-sm">{order.id}</p>
                </div>
                <div className="flex flex-col gap-2 p-2 col-span-2">
                  <span className="text-gray-500 text-xs font-semibold">
                    Total
                  </span>
                  <p className="text-primary-400 text-sm">${order.total}</p>
                </div>
                <div className="flex flex-col gap-2 p-2 col-span-3">
                  <span className="text-gray-500 text-xs font-semibold">
                    Cliente
                  </span>
                  <p className="text-gray-100 text-sm">{order.customer}</p>
                </div>
                <div className="flex flex-col gap-2 p-2 col-span-2">
                  <span className="text-gray-500 text-xs font-semibold">
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
                  <span className="text-gray-500 text-xs font-semibold">
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
                  <span className="text-gray-500 text-xs font-semibold">
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
      )}
    </div>
  );
};

export default OrderList;
