import React, { useContext, useEffect, useState } from "react";
import CustomSubtitle from "../shared/customSubtitle";
import IconAdd from "../../assets/svg/iconAdd";
import { stockContext } from "../../contexts/stockContext";
import CustomInput from "../shared/customInput";
import IconSearch from "../../assets/svg/iconSearch";
import CardIconInfo from "../shared/cardIconInfo";
import IconDispatches from "../../assets/svg/iconDispatches";

const StockList = () => {
  const { stockData } = useContext(stockContext);

  const [inputSearch, setInputSearch] = useState("");
  const [productsToShow, setProductsToShow] = useState();
  const [stockResume, setStockResume] = useState();

  useEffect(() => {
    function somarEstoquesPorDepositos() {
      const depositos = {};

      productsToShow?.forEach((item) => {
        const { deposits } = item;

        Object.entries(deposits).forEach(([deposito, quantidade]) => {
          if (depositos.hasOwnProperty(deposito)) {
            depositos[deposito] += quantidade;
          } else {
            depositos[deposito] = quantidade;
          }
        });
      });
      console.log(depositos);
      setStockResume(depositos);
    }

    somarEstoquesPorDepositos();
  }, [productsToShow]);

  useEffect(() => {
    function loadData() {
      setProductsToShow(stockData);
    }

    loadData();
  }, [stockData]);

  function handleChange({ target }) {
    const inputText = target.value;
    setInputSearch(inputText);

    const filteredStock = stockData?.filter((product) =>
      product.description.toLowerCase().includes(inputText.toLowerCase())
    );

    setProductsToShow(filteredStock);
  }

  return (
    <div className="col-span-12 row-span-10 bg-gray-900 p-4 rounded-sm border-2 border-gray-800 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <CustomSubtitle
          icon={<IconAdd fill="fill-primary-400" width="25px" />}
          subtitle="Produtos em Estoque"
        />
        <div className="w-[300px]">
          <CustomInput
            placeholder="Pesquise por um Produto"
            inputValue={inputSearch}
            onChange={handleChange}
            icon={<IconSearch fill="fill-gray-500" />}
          />
        </div>
      </div>

      <div className="w-full flex items-center gap-8 my-6">
        {stockResume?.paraguay > 0 && (
          <CardIconInfo
            label="Paraguay"
            icon={<IconDispatches fill="fill-primary-400" />}
            data={`${stockResume?.paraguay}`}
          />
        )}
        {stockResume?.roma > 0 && (
          <CardIconInfo
            label="Roma"
            icon={<IconDispatches fill="fill-primary-400" />}
            data={`${stockResume?.roma}`}
          />
        )}
        {stockResume?.transitoRodrigo > 0 && (
          <CardIconInfo
            label="Trans. Rodrigo"
            icon={<IconDispatches fill="fill-primary-400" />}
            data={`${stockResume?.transitoRodrigo}`}
          />
        )}
        {stockResume?.paraguayKm10 > 0 && (
          <CardIconInfo
            label="Paraguay Km10"
            icon={<IconDispatches fill="fill-primary-400" />}
            data={`${stockResume?.paraguayKm10}`}
          />
        )}
        {stockResume?.freteiro > 0 && (
          <CardIconInfo
            label="Freteiro"
            icon={<IconDispatches fill="fill-primary-400" />}
            data={`${stockResume?.freteiro}`}
          />
        )}
        {stockResume?.roma2 > 0 && (
          <CardIconInfo
            label="Roma 2"
            icon={<IconDispatches fill="fill-primary-400" />}
            data={`${stockResume?.roma2}`}
          />
        )}
        {stockResume?.perca > 0 && (
          <CardIconInfo
            label="Perca"
            icon={<IconDispatches fill="fill-primary-400" />}
            data={`${stockResume?.perca}`}
          />
        )}
        {stockResume?.transito > 0 && (
          <CardIconInfo
            label="Transito"
            icon={<IconDispatches fill="fill-primary-400" />}
            data={`${stockResume?.transito}`}
          />
        )}
        {stockResume?.portoAlegre > 0 && (
          <CardIconInfo
            label="POA"
            icon={<IconDispatches fill="fill-primary-400" />}
            data={`${stockResume?.portoAlegre}`}
          />
        )}
        {stockResume?.beloHorizonte > 0 && (
          <CardIconInfo
            label="BH"
            icon={<IconDispatches fill="fill-primary-400" />}
            data={`${stockResume?.beloHorizonte}`}
          />
        )}
      </div>

      <div className="overflow-auto o flex flex-col gap-4 pr-4">
        {productsToShow &&
          productsToShow.map((product) => {
            return (
              <div
                id={product.code}
                className="bg-gray-950 rounded flex items-center gap-2"
              >
                <div className="flex flex-col gap-2 p-2 w-18">
                  <span className="text-gray-500 text-xs font-semibold">
                    Dígito
                  </span>
                  <p className="text-gray-100 text-sm">{product.digit}</p>
                </div>
                <div className="flex flex-col gap-2 p-2 w-[400px]">
                  <span className="text-gray-500 text-xs font-semibold">
                    Descrição
                  </span>
                  <p className="text-gray-100 text-sm">{product.description}</p>
                </div>
                <div className="flex flex-col gap-2 p-2 w-24">
                  <span className="text-gray-500 text-xs font-semibold">
                    Total
                  </span>
                  <p className="text-primary-500 text-sm">{product.total} un</p>
                </div>
                <div className="flex flex-col gap-2 p-2 w-24">
                  <span className="text-gray-500 text-xs font-semibold">
                    Paraguay
                  </span>
                  <p className="text-gray-100 text-sm">
                    {product.deposits.paraguay} un
                  </p>
                </div>
                <div className="flex flex-col gap-2 p-2 w-24">
                  <span className="text-gray-500 text-xs font-semibold">
                    Roma
                  </span>
                  <p className="text-gray-100 text-sm">
                    {product.deposits.roma} un
                  </p>
                </div>
                <div className="flex flex-col gap-2 p-2 w-24">
                  <span className="text-gray-500 text-xs font-semibold">
                    Trans. Rodrigo
                  </span>
                  <p className="text-gray-100 text-sm">
                    {product.deposits.transitoRodrigo} un
                  </p>
                </div>
                <div className="flex flex-col gap-2 p-2 w-24">
                  <span className="text-gray-500 text-xs font-semibold">
                    Paraguay Km10
                  </span>
                  <p className="text-gray-100 text-sm">
                    {product.deposits.paraguayKm10} un
                  </p>
                </div>
                <div className="flex flex-col gap-2 p-2 w-24">
                  <span className="text-gray-500 text-xs font-semibold">
                    Freteiro
                  </span>
                  <p className="text-gray-100 text-sm">
                    {product.deposits.freteiro} un
                  </p>
                </div>
                <div className="flex flex-col gap-2 p-2 w-24">
                  <span className="text-gray-500 text-xs font-semibold">
                    Roma 2
                  </span>
                  <p className="text-gray-100 text-sm">
                    {product.deposits.roma2} un
                  </p>
                </div>
                <div className="flex flex-col gap-2 p-2 w-24">
                  <span className="text-gray-500 text-xs font-semibold">
                    Perca
                  </span>
                  <p className="text-gray-100 text-sm">
                    {product.deposits.perca} un
                  </p>
                </div>
                <div className="flex flex-col gap-2 p-2 w-24">
                  <span className="text-gray-500 text-xs font-semibold">
                    Transito
                  </span>
                  <p className="text-gray-100 text-sm">
                    {product.deposits.transito} un
                  </p>
                </div>
                <div className="flex flex-col gap-2 p-2 w-24">
                  <span className="text-gray-500 text-xs font-semibold">
                    POA
                  </span>
                  <p className="text-gray-100 text-sm">
                    {product.deposits.portoAlegre} un
                  </p>
                </div>
                <div className="flex flex-col gap-2 p-2 w-24">
                  <span className="text-gray-500 text-xs font-semibold">
                    BH
                  </span>
                  <p className="text-gray-100 text-sm">
                    {product.deposits.beloHorizonte} un
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default StockList;
