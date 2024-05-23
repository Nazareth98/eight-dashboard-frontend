import React, { useContext, useEffect, useState } from "react";
import DataCard from "../shared/card/dataCard";
import IconPayments from "../../assets/svg/iconPayments";
import { billToPayContext } from "../../contexts/billToPayContext";
import { formatCurrency } from "../../utils/generalsUtils";

const BillToPayInfo = () => {
  const { updateData, billToPayData } = useContext(billToPayContext);

  const [total, setTotal] = useState(0);
  const [paidOut, setPaidOut] = useState(0);
  const [pending, setPending] = useState(0);
  const [billsAmount, setBillAmount] = useState(0);

  useEffect(() => {
    if (!billToPayData) {
      setTotal(0);
      setPaidOut(0);
      setPending(0);
      return;
    }

    let totalSum = 0;
    let paidOutSum = 0;
    let pendingSum = 0;

    billToPayData.forEach((bill) => {
      const billValue = Number(bill.value);
      totalSum += billValue;
      if (bill.status === 1) {
        paidOutSum += billValue;
      } else {
        pendingSum += billValue;
      }
    });
    setTotal(totalSum);
    setPaidOut(paidOutSum);
    setPending(pendingSum);
    setBillAmount(billToPayData.length);
  }, [billToPayData]);

  return (
    <>
      <DataCard
        type="alternate"
        name="Total do mês"
        icon={<IconPayments fill="fill-gray-300" />}
        value={`$${formatCurrency(total)}`}
      />

      <DataCard
        name="Pago"
        icon={<IconPayments fill="fill-primary-400" />}
        value={`$${formatCurrency(paidOut)}`}
      />

      <DataCard
        type="danger"
        name="Pendente"
        icon={<IconPayments fill="fill-red-500 " />}
        value={`$${formatCurrency(pending)}`}
      />
      <DataCard
        type="attention"
        name="Contas totais"
        value={`${billsAmount}`}
      />
    </>
  );
};

export default BillToPayInfo;
