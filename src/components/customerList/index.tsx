import { useContext, useEffect, useState } from "react";

import { customerContext } from "../../contexts/customerContext";

import IconGroups from "../../assets/svg/iconGroups";
import { formatCurrency } from "../../utils/generalsUtils";
import ComponentContainer from "../shared/componentContainer";
import CustomSubtitle from "../shared/customSubtitle";
import Loading from "../shared/loading";
import CustomerType from "../../types/customerType";
import { CheckCircle, Circle, MousePointerClick } from "lucide-react";
import CustomButton from "../shared/customButton";

const CustomerList = () => {
  const { customerData } = useContext(customerContext);

  const [customersToShow, setCustomersToShow] = useState<CustomerType[]>();
  const [isFiltered, setIsFiltered] = useState<boolean>(true);

  useEffect(() => {
    function loadData() {
      const filteredCharges = customerData?.filter(
        (charge: CustomerType) => charge.balance != 0
      );
      setCustomersToShow(filteredCharges);
    }
    if (customerData) {
      loadData();
    }
  }, [customerData]);

  function toogleFiltered() {
    setIsFiltered(!isFiltered);
    if (!isFiltered) {
      const updatedData = customersToShow.filter(
        (charge: CustomerType) => charge.balance !== 0
      );
      setCustomersToShow(updatedData);
    } else {
      setCustomersToShow(customerData);
    }
  }

  return (
    <ComponentContainer cols="9" rows="10">
      <CustomSubtitle
        icon={<IconGroups fill="fill-gray-500" width="25px" />}
        subtitle="Todos os Clientes"
      />
      {customersToShow ? (
        <>
          <div className="w-full flex flex-col items-start gap-2">
            <div className="flex items-center gap-1">
              <MousePointerClick className="size-5 text-gray-700" />
              <span className="text-gray-400 font-heading ">Filtros</span>
            </div>
            <div>
              <CustomButton
                theme={isFiltered ? "default" : "alternate"}
                onClick={toogleFiltered}
              >
                {isFiltered ? (
                  <CheckCircle className="size-4" />
                ) : (
                  <Circle className="size-4" />
                )}
                somente com saldo
              </CustomButton>
            </div>
          </div>
          <div className="overflow-y-auto flex flex-col gap-4 pr-4">
            {customersToShow.map((customer) => {
              return (
                <div
                  key={`${customer.id}-${customer.name}`}
                  className="border-l-4 border-2 border-gray-900 border-l-primary-400 rounded grid grid-cols-12 p-1 gap-2 transition-all fade-left hover:bg-gray-900 fade-left"
                >
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
                      $
                      {formatCurrency(
                        customer.balance - customer.sheetsBalance
                      )}
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
        </>
      ) : (
        <Loading />
      )}
    </ComponentContainer>
  );
};

export default CustomerList;
