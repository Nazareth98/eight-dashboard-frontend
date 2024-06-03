import React, { useContext } from "react";
import DataCard from "../shared/card/dataCard";
import IconPdv from "../../assets/svg/iconPdv";
import IconClip from "../../assets/svg/iconClip";
import IconCoin from "../../assets/svg/iconCoin";
import IconStock from "../../assets/svg/iconStock";
import { formatCurrency } from "../../utils/generalsUtils";
import { overviewContext } from "../../contexts/overviewContext";

const OverviewData = () => {
  const { mainValues } = useContext(overviewContext);

  return (
    <>
      <DataCard
        value={
          mainValues ? `$${formatCurrency(mainValues.valueCash)}` : "$ 0,00"
        }
        name="Valor de Caixa"
        icon={<IconPdv fill="fill-primary-400" />}
      />
      <DataCard
        value={
          mainValues ? `$${formatCurrency(mainValues.balanceToPay)}` : "$ 0,00"
        }
        name="Contas a Pagar"
        type="danger"
        icon={<IconClip fill="fill-red-500" />}
      />
      <DataCard
        value={
          mainValues
            ? `$${formatCurrency(mainValues.balanceToReceive)}`
            : "$ 0,00"
        }
        name="Contas a Cobrar"
        type="attention"
        icon={<IconCoin fill="fill-yellow-300" />}
      />
      <DataCard
        value={
          mainValues ? `$${formatCurrency(mainValues.stockValue)}` : "$ 0,00"
        }
        name="Valor de estoque"
        type="alternate"
        icon={<IconStock fill="fill-blue-300" />}
      />
    </>
  );
};

export default OverviewData;
