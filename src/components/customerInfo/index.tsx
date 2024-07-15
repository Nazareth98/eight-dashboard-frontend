import React, { useContext, useEffect, useState } from "react";
import DataCard from "../shared/card/dataCard";
import { formatCurrency } from "../../utils/generalsUtils";
import IconPayments from "../../assets/svg/iconPayments";
import { customerContext } from "../../contexts/customerContext";

const CustomerInfo = () => {
  const { customerData } = useContext(customerContext);

  const [systemBalance, setSystemBalance] = useState(0);
  const [sheetsBalance, setSheetsBalance] = useState(0);
  const [balanceDiff, setBalanceDiff] = useState(0);

  useEffect(() => {
    function loadData() {
      let systemTotal = 0;
      let sheetsTotal = 0;

      customerData.forEach((customer) => {
        systemTotal += customer.balance;
        sheetsTotal += customer.sheetsBalance;
      });

      setSystemBalance(systemTotal);
      setSheetsBalance(sheetsTotal);
      setBalanceDiff(systemTotal - sheetsTotal);
    }
    if (customerData) {
      loadData();
    }
  }, [customerData]);

  return (
    <>
      <DataCard
        type="alternate"
        name="Saldo do Sistema"
        icon={<IconPayments fill="fill-blue-300" />}
        value={`$${formatCurrency(systemBalance)}`}
      />
      <DataCard
        type="danger"
        name="Saldo da Planilha"
        icon={<IconPayments fill="fill-red-500 " />}
        value={`$${formatCurrency(sheetsBalance)}`}
      />
      <DataCard
        name="Diferença entre saldos"
        icon={<IconPayments fill="fill-primary-400" />}
        value={`$${formatCurrency(balanceDiff)}`}
      />
    </>
  );
};

export default CustomerInfo;
