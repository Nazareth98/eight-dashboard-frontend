import { useEffect, useState } from "react";

import DataCard from "../shared/card/dataCard";
import IconPayments from "../../assets/svg/iconPayments";
import { formatCurrency } from "../../utils/generalsUtils";

const MonthlyExpensesInfo = ({ billToPayData }) => {
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
        icon={<IconPayments fill="fill-blue-300" />}
        value={`$${formatCurrency(total)}`}
      />

      <DataCard
        type="danger"
        name="Pendente"
        icon={<IconPayments fill="fill-red-500 " />}
        value={`$${formatCurrency(pending)}`}
      />

      <DataCard
        name="Pago"
        icon={<IconPayments fill="fill-primary-400" />}
        value={`$${formatCurrency(paidOut)}`}
      />
    </>
  );
};

export default MonthlyExpensesInfo;
