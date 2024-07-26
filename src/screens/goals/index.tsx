import { useContext, useEffect, useState } from "react";
import GoalsCharges from "../../components/goalsCharges";
import GoalsDaily from "../../components/goalsDaily";
import GoalsDetails from "../../components/goalsDetails";
import GoalsManager from "../../components/goalsManager";
import GoalsReceipt from "../../components/goalsReceipt";
import GoalsWeekly from "../../components/goalsWeekly";
import ScreenContainer from "../../components/shared/screenContainer";
import { customerContext } from "../../contexts/customerContext";
import { PaymentType } from "../../types/paymentType";
import { ChargeType } from "../../types/chargeType";
import { sheetsContext } from "../../contexts/sheetsContext";
import { goalsContext } from "../../contexts/goalsContext";
import GoalsResume from "../../components/goalsDetails/goalsResume";

const Goals = () => {
  const { searchData } = useContext(goalsContext);
  const { refreshData } = useContext(customerContext);
  const { getCharges } = useContext(sheetsContext);

  const [daylyPaymentsData, setDailyPaymentsData] = useState<PaymentType[]>();
  const [selectedSheetsData, setSelectedSheetsData] = useState<any>();
  const [charges, setCharges] = useState<ChargeType[]>();

  useEffect(() => {
    async function loadData() {
      await refreshData();
      const result = await getCharges();
      setCharges(result);
    }
    loadData();
  }, []);

  return (
    <ScreenContainer>
      {searchData ? (
        <>
          {/* <GoalsManager data={monthlyPaymentsData} /> */}
          <GoalsDetails
            setSelectedSheetsData={setSelectedSheetsData}
            selectedSheetsData={selectedSheetsData}
            charges={charges}
          />
          <GoalsWeekly
            setDailyData={setDailyPaymentsData}
            setSelectedSheetsData={setSelectedSheetsData}
          />
          <GoalsDaily dailyData={daylyPaymentsData} />
          <GoalsReceipt />
        </>
      ) : (
        <>
          <GoalsResume />
          <GoalsCharges
            setSelectedSheetsData={setSelectedSheetsData}
            charges={charges}
            setCharges={setCharges}
          />
        </>
      )}
    </ScreenContainer>
  );
};

export default Goals;
