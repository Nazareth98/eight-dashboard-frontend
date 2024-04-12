import { useContext } from "react";

import { customerContext } from "../../contexts/customerContext";

import CustomSubtitle from "../shared/customSubtitle";
import IconGroups from "../../assets/svg/iconGroups";
import CustomerRating from "../shared/customerRating";

const CustomerList = () => {
  const { customerData } = useContext(customerContext);

  return (
    <div className="col-span-5 row-span-6 col-start-1 bg-gray-900 p-4 rounded-sm border-2 border-gray-800 flex flex-col gap-4">
      <CustomSubtitle
        icon={<IconGroups fill="fill-primary-400" width="25px" />}
        subtitle="Todos os Clientes"
      />
      {customerData && (
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
                        ? "text-red-800"
                        : `text-gray-600`
                    }
                  >
                    ${customer.balance}
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
                <div className="flex flex-col gap-2 p-2 col-span-2">
                  <span className="text-gray-500 text-xs font-semibold">
                    Grupo
                  </span>
                  <p className="text-gray-100 text-sm">
                    {customer.group ? customer.group.name : "-"}
                  </p>
                </div>
                <div className="flex flex-col gap-2 p-2 col-span-1">
                  <span className="text-gray-500 text-xs font-semibold">
                    Nota
                  </span>
                  <CustomerRating rating="A" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomerList;
