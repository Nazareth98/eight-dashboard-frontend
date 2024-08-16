import {
  Calendar,
  FileText,
  MousePointerClick,
  ShoppingCart,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { formatCurrency } from "../../utils/generalsUtils";
import ComponentContainer from "../shared/componentContainer";
import CustomSubtitle from "../shared/customSubtitle";
import { providersContext } from "../../contexts/providersContext";

const PurchasesDetails = ({ data }) => {
  const { providerPurchases } = useContext(providersContext);
  const [selectPurchase, setSelectPurchase] = useState();

  useEffect(() => {
    setSelectPurchase(undefined);
  }, [providerPurchases]);

  function handleSelectPurchase({ currentTarget }) {
    const id = currentTarget.id;
    const purchase = data.items.find((purchase) => purchase.invoice == id);
    console.log(purchase);
    setSelectPurchase(purchase);
  }

  return (
    <ComponentContainer classToAdd="row-span-12 col-span-4">
      <CustomSubtitle
        subtitle="Detalhes das Compras"
        icon={<FileText className="size-6" />}
      />

      {data ? (
        <>
          <div className="w-full flex-1 flex items-center gap-2 fade-left">
            <Calendar className="size-5 text-gray-600" />
            <h2 className="text-xl text-gray-300 font-heading font-semibold ">
              Semana {data?.week}
            </h2>
          </div>

          <div className="rounded-lg min-h-[150px] overflow-y-auto flex flex-col gap-2 fade-left">
            {data?.items.map((purchase) => {
              return (
                <div
                  id={purchase.invoice}
                  key={`${purchase.invoice}-${purchase.providerName}`}
                  onClick={handleSelectPurchase}
                  className={`p-3 rounded cursor-pointer text-gray-200 text-sm font-heading flex gap-2 justify-between transition-all hover:bg-gray-800 fade-left active:bg-gray-900 ${
                    selectPurchase?.invoice == purchase.invoice
                      ? "bg-gray-800"
                      : "bg-gray-900"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div>
                      <ShoppingCart className="size-4" />
                    </div>
                    <p>{purchase.invoice}</p>
                    <p>{purchase.providerName}</p>
                  </div>
                  <p className="text-primary-400">
                    ${formatCurrency(purchase.total)}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="w-24 m-auto h-[2px] bg-gray-900" />

          {selectPurchase ? (
            <>
              <div className="w-full flex-1 flex items-center gap-2 fade-left">
                <Calendar className="size-5 text-gray-600" />
                <h2 className="text-xl text-gray-300 font-heading font-semibold ">
                  Nota: {selectPurchase.invoice}
                </h2>
              </div>
              <div className="h-full overflow-y-auto flex flex-col gap-2">
                {selectPurchase?.products.map((product) => {
                  return (
                    <div
                      id={product.product}
                      key={`${product.product}-${product.description}`}
                      className="bg-gray-900 font-heading text-sm rounded grid grid-cols-6 gap-2 items-center font-medium fade-left"
                    >
                      <div className="flex flex-col gap-2 p-2 col-span-1">
                        <p className="text-gray-300">{product.product}</p>
                      </div>
                      <div className="flex flex-col gap-2 p-2 col-span-4">
                        <p className="text-gray-300 ">{product.description}</p>
                      </div>

                      <div className="flex flex-col gap-2 p-2 col-span-1 items-center">
                        <p className="text-gray-200 text-right ">
                          {product.amount}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="w-full h-full inset-0 text-gray-500 font-heading flex items-center justify-center gap-2 fade-left">
              <MousePointerClick className="size-4" />
              <span>Selecione uma Nota</span>
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full inset-0 text-gray-500 font-heading flex items-center justify-center gap-2 fade-left">
          <MousePointerClick className="size-4" />
          <span>Selecione uma semana</span>
        </div>
      )}
    </ComponentContainer>
  );
};

export default PurchasesDetails;
