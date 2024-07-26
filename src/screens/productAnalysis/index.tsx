import { useContext, useState } from "react";
import ProductsByBrand from "../../components/productsByBrand";
import ProductsByGroup from "../../components/productsByGroup";
import DataCard from "../../components/shared/card/dataCard";
import ScreenContainer from "../../components/shared/screenContainer";
import TopSellingProducts from "../../components/topSellingProducts";
import { productAnalysisContext } from "../../contexts/productsAnalysisContext";
import { Boxes, Flame, Tag } from "lucide-react";

const ProductAnalysis = () => {
  const { salesByBrand, salesByGroup, salesByProduct } = useContext(
    productAnalysisContext
  );

  return (
    <ScreenContainer>
      <TopSellingProducts />
      {salesByBrand && (
        <DataCard
          value={salesByBrand[0].brandName}
          name="Marca mais vendida"
          type="alternate"
          icon={<Tag className="size-6 text-blue-300" />}
        />
      )}
      {salesByGroup && (
        <DataCard
          value={salesByGroup[0].description}
          name="Grupo mais vendido"
          type="attention"
          icon={<Boxes className="size-6 text-yellow-300" />}
        />
      )}
      {salesByProduct && (
        <DataCard
          value={salesByProduct[0].description}
          name="Produto mais vendido"
          type="danger"
          icon={<Flame className="size-6 text-red-500" />}
        />
      )}
      <ProductsByBrand />
      <ProductsByGroup />
    </ScreenContainer>
  );
};

export default ProductAnalysis;
