import DataCard from "../shared/card/dataCard";
import IconPayments from "../../assets/svg/iconPayments";
import { formatCurrency } from "../../utils/generalsUtils";
import { useEffect, useState } from "react";
import { ProviderType } from "../../types/providerType";

const ProvidersInfo = ({ providers }) => {
  const [systemBalance, setSystemBalance] = useState<number>(0);
  const [sheetsBalance, setSheetsBalance] = useState<number>(0);
  const [balanceDiff, setBalanceDiff] = useState<number>(0);

  useEffect(() => {
    function loadData() {
      let systemTotal = 0;
      let sheetsTotal = 0;

      providers.forEach((provider: ProviderType) => {
        console.log(provider.sheetsBalance);
        systemTotal += provider.balance;

        if (provider.sheetsBalance) {
          sheetsTotal += provider.sheetsBalance;
        }
      });

      console.log(sheetsTotal, systemTotal);

      setSystemBalance(systemTotal);
      setSheetsBalance(sheetsTotal);
      setBalanceDiff(systemTotal - sheetsTotal);
    }
    if (providers) {
      loadData();
    }
  }, [providers]);

  return (
    <>
      <DataCard
        type="alternate"
        name="Saldo do Sistema"
        icon={<IconPayments fill="fill-blue-300" />}
        value={`$${formatCurrency(systemBalance)}`}
      />
      <DataCard
        name="Saldo do Sheets"
        icon={<IconPayments fill="fill-primary-400" />}
        value={`$${formatCurrency(sheetsBalance)}`}
      />
      <DataCard
        type="danger"
        name="Diferença entre saldos"
        icon={<IconPayments fill="fill-red-500 " />}
        value={`$${formatCurrency(balanceDiff)}`}
      />
    </>
  );
};

export default ProvidersInfo;
