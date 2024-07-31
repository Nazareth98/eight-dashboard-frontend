import { useContext, useEffect, useState } from "react";
import GoalsCharges from "../../components/goalsCharges";
import GoalsDaily from "../../components/goalsDaily";
import GoalsDetails from "../../components/goalsDetails";
import GoalsResume from "../../components/goalsDetails/goalsResume";
import GoalsReceipt from "../../components/goalsReceipt";
import GoalsWeekly from "../../components/goalsWeekly";
import ScreenContainer from "../../components/shared/screenContainer";
import { customerContext } from "../../contexts/customerContext";
import { goalsContext } from "../../contexts/goalsContext";
import { PaymentType } from "../../types/paymentType";

const Goals = () => {
  const { searchData, updateCharges } = useContext(goalsContext);
  const { refreshData } = useContext(customerContext);

  const [daylyPaymentsData, setDailyPaymentsData] = useState<PaymentType[]>();
  const [selectedSheetsData, setSelectedSheetsData] = useState<any>();

  useEffect(() => {
    async function loadData() {
      await refreshData();
      await updateCharges();
    }
    loadData();
  }, []);

  return (
    <ScreenContainer>
      {selectedSheetsData && searchData ? (
        <>
          <GoalsDetails
            setSelectedSheetsData={setSelectedSheetsData}
            selectedSheetsData={selectedSheetsData}
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
          <GoalsCharges setSelectedSheetsData={setSelectedSheetsData} />
        </>
      )}
    </ScreenContainer>
  );
};

export default Goals;
