import React, { useContext } from "react";
import DataCard from "../shared/card/dataCard";
import { Boxes, Flame, Tag } from "lucide-react";
import { inventoryTurnoverContext } from "../../contexts/InventoryTurnoverContext";

const TurnoverInfo = () => {
  const { dataByBrand, dataByGroup, dataByProduct } = useContext(
    inventoryTurnoverContext
  );
  console.log(dataByBrand, dataByGroup, dataByProduct);

  if (!dataByProduct || !dataByGroup || !dataByBrand) {
    return;
  }

  return (
    <>
      <DataCard
        value={dataByProduct[0] ? dataByProduct[0].description : "-"}
        name="Produto com maior giro"
        type="danger"
        icon={<Flame className="size-6 text-red-500" />}
      />
      <DataCard
        value={dataByGroup[0] ? dataByGroup[0].description : "-"}
        name="Grupo com maior giro"
        type="attention"
        icon={<Boxes className="size-6 text-yellow-300" />}
      />
      <DataCard
        value={dataByBrand[0] ? dataByBrand[0]?.description : "-"}
        name="Marca com maior giro"
        type="alternate"
        icon={<Tag className="size-6 text-blue-300" />}
      />
    </>
  );
};

export default TurnoverInfo;
