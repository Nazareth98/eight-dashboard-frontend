import React, { useContext } from "react";
import { billToPayContext } from "../../contexts/billToPayContext";
import CustomSubtitle from "../shared/customSubtitle";
import IconOrders from "../../assets/svg/iconOrders";
import CustomButton from "../shared/customButton";
import IconEdit from "../../assets/svg/iconEdit";
import IconDelete from "../../assets/svg/iconDelete";
import IconPayments from "../../assets/svg/iconPayments";

const BillsToPayList = () => {
  const { billToPayData } = useContext(billToPayContext);

  function handleDelete() {}

  return (
    <div className="col-span-8 row-span-8 row-start-3 bg-gray-900 p-4 rounded-sm border-2 border-gray-800 flex flex-col gap-4">
      <CustomSubtitle
        icon={<IconOrders fill="fill-primary-400" width="25px" />}
        subtitle="Contas do Mês Atual"
      />

      <div className="overflow-y-auto flex flex-col gap-4 pr-4">
        {billToPayData?.map((bill) => {
          return (
            <div
              id={bill.id}
              className="border-2 rounded grid grid-cols-12 gap-2 transition-all border-gray-950 bg-gray-950"
            >
              <div className="flex flex-col gap-2 p-2 col-span-2">
                <span className={`text-gray-500 text-xs font-semibold`}>
                  Nome
                </span>
                <p className="text-gray-100 text-sm">{bill.name}</p>
              </div>
              <div className="flex flex-col gap-2 p-2 col-span-2">
                <span className={`text-gray-500 text-xs font-semibold`}>
                  Valor
                </span>
                <p className="text-primary-400 text-sm">${bill.value}</p>
              </div>
              <div className="flex flex-col gap-2 p-2 col-span-4">
                <span className={`text-gray-500 text-xs font-semibold`}>
                  Descrição
                </span>
                <p className="text-gray-100 text-sm">{bill.description}</p>
              </div>
              <div className="flex flex-col gap-2 p-2 col-span-2">
                <span className={`text-gray-500 text-xs font-semibold`}>
                  Vencimento
                </span>
                <p
                  className={
                    bill.status === 1
                      ? "text-gray-100 text-sm"
                      : "text-yellow-400 text-sm"
                  }
                >
                  {bill.dueDate}
                </p>
              </div>
              <div className="flex flex-col gap-2 p-2 col-span-1">
                <span className={`text-gray-500 text-xs font-semibold`}>
                  Status
                </span>
                <p
                  className={
                    bill.status === 1
                      ? "text-primary-400 text-sm"
                      : "text-yellow-400 text-sm"
                  }
                >
                  {bill.status === 1 ? "Pago" : "Pendente"}
                </p>
              </div>
              <div className="flex flex-col gap-2 p-2 col-span-1">
                <span className={`text-gray-500 text-xs font-semibold`}>
                  Ações
                </span>
                <div className="flex items-center gap-1">
                  <IconPayments
                    id={bill.id}
                    fill={
                      bill.status === 1
                        ? "fill-gray-700"
                        : "fill-primary-700 trasnsition-all hover:fill-primary-400"
                    }
                    width="20px"
                  />
                  <IconDelete
                    id={bill.id}
                    onClick={bill.status === 1 ? null : handleDelete}
                    fill={
                      bill.status === 1
                        ? "fill-gray-700"
                        : "fill-red-600 trasnsition-all hover:fill-primary-400"
                    }
                    width="20px"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BillsToPayList;
