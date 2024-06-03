import { useContext, useState } from "react";

import { customerContext } from "../../contexts/customerContext";

import CustomSubtitle from "../shared/customSubtitle";
import IconGroups from "../../assets/svg/iconGroups";
import { formatCurrency } from "../../utils/generalsUtils";
import Loading from "../shared/loading";

const CustomerList = () => {
  const { customerData } = useContext(customerContext);

  return (
    <div className="col-span-5 row-span-7 col-start-1 bg-gray-900 p-6 rounded-xl border border-gray-800 flex flex-col gap-4">
      <CustomSubtitle
        icon={<IconGroups fill="fill-gray-500" width="25px" />}
        subtitle="Todos os Clientes"
      />
      {customerData ? (
        <div className="overflow-y-auto flex flex-col gap-4 pr-4">
          {customerData.map((customer) => {
            return (
              <div className="bg-gray-950 rounded grid grid-cols-12 gap-2 ">
                <div className="flex flex-col gap-2 p-2 col-span-3">
                  <span className="text-gray-500 text-xs font-semibold">
                    Nome
                  </span>
                  <p className="text-gray-100 text-sm">{customer.name}</p>
                </div>
                <div className="flex flex-col gap-2 p-2 col-span-3">
                  <span className="text-gray-500 text-xs font-semibold">
                    Saldo
                  </span>
                  <p
                    className={
                      customer.balance > 0
                        ? "text-primary-500 text-sm"
                        : customer.balance < 0
                        ? "text-red-500"
                        : `text-gray-600`
                    }
                  >
                    ${formatCurrency(customer.balance)}
                  </p>
                </div>
                <div className="flex flex-col gap-2 p-2 col-span-3">
                  <span className="text-gray-500 text-xs font-semibold">
                    Contato
                  </span>
                  <p className="text-gray-100 text-sm">
                    {customer.contact ? customer.contact.name : "-"}
                  </p>
                </div>
                <div className="flex flex-col gap-2 p-2 col-span-3">
                  <span className="text-gray-500 text-xs font-semibold">
                    Grupo
                  </span>
                  <p className="text-gray-100 text-sm">
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
