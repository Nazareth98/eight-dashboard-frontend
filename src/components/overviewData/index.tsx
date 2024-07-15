import React, { useContext, useState } from "react";
import DataCard from "../shared/card/dataCard";
import IconPdv from "../../assets/svg/iconPdv";
import IconClip from "../../assets/svg/iconClip";
import IconCoin from "../../assets/svg/iconCoin";
import IconStock from "../../assets/svg/iconStock";
import { formatCurrency } from "../../utils/generalsUtils";
import { overviewContext } from "../../contexts/overviewContext";
import ModalValuesCash from "./modalValuesCash";
import ModalProviders from "./modalProviders";
import ModalDebtors from "./modalDebtors";

const OverviewData = ({ changeScreen }) => {
  const { mainValues } = useContext(overviewContext);

  const [valuesCashIsOpen, setValuesCashIsOpen] = useState(false);
  const [providersIsOpen, setProvidersIsOpen] = useState(false);
  const [debtorsIsOpen, setDebtorsIsOpen] = useState(false);

  function handleCashValues() {
    setValuesCashIsOpen(true);
  }

  function handleProviders() {
    setProvidersIsOpen(true);
  }

  function handleDebtors() {
    setDebtorsIsOpen(true);
  }

  function handleChangeScreen() {
    changeScreen("Estoque");
  }

  return (
    <>
      <ModalValuesCash
        isOpen={valuesCashIsOpen}
        setIsOpen={setValuesCashIsOpen}
      />
      <ModalProviders isOpen={providersIsOpen} setIsOpen={setProvidersIsOpen} />
      <ModalDebtors isOpen={debtorsIsOpen} setIsOpen={setDebtorsIsOpen} />
      <DataCard
        onClick={handleCashValues}
        value={
          mainValues ? `$${formatCurrency(mainValues.valueCash)}` : "$ 0,00"
        }
        name="Valor de Caixa"
        icon={<IconPdv fill="fill-primary-400" />}
      />
      <DataCard
        onClick={handleProviders}
        value={
          mainValues ? `$${formatCurrency(mainValues.balanceToPay)}` : "$ 0,00"
        }
        name="Contas a Pagar"
        type="danger"
        icon={<IconClip fill="fill-red-500" />}
      />
      <DataCard
        onClick={handleDebtors}
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
        onClick={handleChangeScreen}
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
