import { useContext, useEffect, useState } from "react";
import CustomSubtitle from "../shared/customSubtitle";
import IconAdd from "../../assets/svg/iconAdd";
import { stockContext } from "../../contexts/stockContext";
import Loading from "../shared/loading";

const StockList = ({ selectGroup, selectDeposit }) => {
  const { stockData } = useContext(stockContext);

  const [productsToShow, setProductsToShow] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function loadData() {
      const filteredStock = stockData?.filter((item) => {
        if (item.group === selectGroup.label && item.deposits[selectDeposit]) {
          return item;
        }
      });
      console.log(filteredStock, selectDeposit);
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
    <div className="col-span-6 row-span-12 bg-gray-900 p-6 rounded-xl border-2 border-gray-800 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <CustomSubtitle
          icon={<IconAdd fill="fill-gray-500" width="25px" />}
          subtitle="Produtos em Estoque"
        />
        <span className="text-primary-400 font-medium">
          {selectDeposit ? selectDeposit : "-"}
        </span>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-auto o flex flex-col gap-4 pr-4">
          {productsToShow &&
            productsToShow.map((product) => {
              return (
                <div
                  id={product.code}
                  key={product.code}
                  className="bg-gray-950 rounded grid grid-cols-6 gap-2"
                >
                  <div className="flex flex-col gap-2 p-2 col-span-1">
                    <span className="text-gray-500 text-xs font-semibold">
                      Dígito
                    </span>
                    <p className="text-gray-100 text-sm">{product.digit}</p>
                  </div>
                  <div className="flex flex-col gap-2 p-2 col-span-4">
                    <span className="text-gray-500 text-xs font-semibold">
                      Descrição
                    </span>
                    <p className="text-gray-100 text-sm">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 p-2 col-span-1">
                    <span className="text-gray-500 text-xs font-semibold">
                      Qntd:
                    </span>
                    <p className="text-gray-100 text-sm font-medium">
                      {product.deposits[selectDeposit]}
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

export default StockList;
