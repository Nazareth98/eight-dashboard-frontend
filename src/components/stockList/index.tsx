import { Archive, MousePointerClick, Warehouse } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { stockContext } from "../../contexts/stockContext";
import ComponentContainer from "../shared/componentContainer";
import CustomSubtitle from "../shared/customSubtitle";
import Loading from "../shared/loading";

const StockList = ({ selectGroup, selectDeposit }) => {
  const { stockData } = useContext(stockContext);

  const [productsToShow, setProductsToShow] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function loadData() {
      const filteredStock = stockData?.filter((item) => {
        if (item.group === selectGroup && item.deposits[selectDeposit]) {
          return item;
        }
      });
      setProductsToShow(filteredStock);
      setTimeout(() => setIsLoading(false), 600);
    }

    setProductsToShow([]);
    if (selectGroup && selectDeposit) {
      setIsLoading(true);
      loadData();
    }
  }, [selectDeposit]);

  return (
    // <div className="col-span-4 row-span-12 p-6 rounded-xl border-2 border-gray-900 flex flex-col gap-8 fade-left">
    <ComponentContainer cols="4" rows="12">
      <CustomSubtitle
        icon={<Archive className="size-6" />}
        subtitle={`Produtos em Estoque`}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h3 className="text-primary-300 font-semibold font-heading text-lg flex items-center gap-2 fade-left">
            <Warehouse className="size-5 text-gray-800" />
            {selectDeposit ? selectDeposit : "-"}
          </h3>
          <div className="h-full overflow-auto flex flex-col gap-2 pr-4">
            {selectDeposit ? (
              productsToShow?.map((product) => {
                return (
                  <div
                    id={product.code}
                    key={product.code}
                    className="bg-gray-900 font-heading text-sm rounded grid grid-cols-6 gap-2 items-center font-medium fade-left"
                  >
                    <div className="flex flex-col gap-2 p-2 col-span-1">
                      <p className="text-gray-300">{product.digit}</p>
                    </div>
                    <div className="flex flex-col gap-2 p-2 col-span-4">
                      <p className="text-gray-300 ">{product.description}</p>
                    </div>

                    <div className="flex flex-col gap-2 p-2 col-span-1 items-center">
                      <p className="text-gray-200 text-right ">
                        {product.deposits[selectDeposit]}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="w-full h-full inset-0 text-gray-500 font-heading flex items-center justify-center gap-2 fade-left">
                <MousePointerClick className="size-4" />
                <span>Selecione um depósito</span>
              </div>
            )}
          </div>
        </>
      )}
    </ComponentContainer>
  );
};

export default StockList;
