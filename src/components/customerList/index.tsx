import { useContext, useState } from "react";

import { customerContext } from "../../contexts/customerContext";

import CustomSubtitle from "../shared/customSubtitle";
import IconGroups from "../../assets/svg/iconGroups";
import { formatCurrency } from "../../utils/generalsUtils";
import Loading from "../shared/loading";

const CustomerList = () => {
  const { customerData } = useContext(customerContext);

  return (
    <div className="col-span-9 row-span-10 p-6 rounded-xl border border-gray-900 flex flex-col gap-4 fade-left">
      <CustomSubtitle
        icon={<IconGroups fill="fill-gray-500" width="25px" />}
        subtitle="Todos os Clientes"
      />
      {customerData ? (
        <div className="overflow-y-auto flex flex-col gap-4 pr-4">
          {customerData.map((customer) => {
            return (
              <div className="border-l-4 border-2 border-gray-900 border-l-primary-400 rounded grid grid-cols-12 p-1 gap-2 transition-all fade-left hover:bg-gray-900 fade-left">
                <div className="flex flex-col gap-2 p-1 col-span-3">
                  <span className="text-gray-500 text-xs font-semibold">
                    Nome
                  </span>
                  <p className="text-gray-100 text-sm font-heading ">
                    {customer.name}
                  </p>
                </div>
                <div className="flex flex-col gap-2 p-1 col-span-2">
                  <span className="text-gray-500 text-xs font-semibold">
                    Saldo Sistema
                  </span>
                  <p
                    className={
                      "font-heading " +
                      (customer.balance > 0
                        ? "text-primary-500"
                        : customer.balance < 0
                        ? "text-red-500"
                        : `text-gray-600`)
                    }
                  >
                    ${formatCurrency(customer.balance)}
                  </p>
                </div>
                <div className="flex flex-col gap-2 p-1 col-span-2">
                  <span className="text-gray-500 text-xs font-semibold">
                    Saldo Planilha
                  </span>
                  <p
                    className={
                      "font-heading " +
                      (customer.sheetsBalance > 0
                        ? "text-primary-500"
                        : customer.sheetsBalance < 0
                        ? "text-red-500"
                        : `text-gray-600`)
                    }
                  >
                    ${formatCurrency(customer.sheetsBalance)}
                  </p>
                </div>

                <div className="flex flex-col gap-2 p-1 col-span-2">
                  <span className="text-gray-500 text-xs font-semibold">
                    Diferença
                  </span>
                  <p
                    className={
                      "font-heading " +
                      (customer.balance - customer.sheetsBalance > 0
                        ? "text-primary-500"
                        : customer.balance - customer.sheetsBalance < 0
                        ? "text-red-500"
                        : `text-gray-600`)
                    }
                  >
                    ${formatCurrency(customer.balance - customer.sheetsBalance)}
                  </p>
                </div>
                <div className="flex flex-col gap-2 p-1 col-span-3">
                  <span className="text-gray-500 text-xs font-semibold">
                    Grupo
                  </span>
                  <p className="text-gray-100 text-sm font-heading">
                    {customer.group ? customer.group.name : "-"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default CustomerList;
