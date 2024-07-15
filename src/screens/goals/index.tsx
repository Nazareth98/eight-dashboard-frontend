import ScreenContainer from "../../components/shared/screenContainer";
import GoalsMonthlyPayments from "../../components/goalsMonthlyPayments";
import { useContext, useEffect, useState } from "react";
import { customerContext } from "../../contexts/customerContext";
import GoalsDetails from "../../components/goalsDetails";
import GoalsReceipt from "../../components/goalsReceipt";
import GoalsDaily from "../../components/goalsDaily";
import { PaymentType } from "../../types/paymentType";
import GoalsWeekly from "../../components/goalsWeekly";

const Goals = () => {
  const { refreshData } = useContext(customerContext);

  const [monthlyPaymentsData, setMonthlyPaymentsData] =
    useState<PaymentType[]>();
  const [daylyPaymentsData, setDailyPaymentsData] = useState<PaymentType[]>();

  useEffect(() => {
    function loadData() {
      refreshData();
    }
    loadData();
  }, []);

  return (
    <ScreenContainer>
      <GoalsMonthlyPayments setData={setMonthlyPaymentsData} />
      <GoalsWeekly
        data={monthlyPaymentsData}
        setDailyData={setDailyPaymentsData}
      />
      <GoalsDaily
        weeklyData={monthlyPaymentsData}
        dailyData={daylyPaymentsData}
      />
      <GoalsDetails data={monthlyPaymentsData} />
      <GoalsReceipt data={monthlyPaymentsData} />
    </ScreenContainer>
  );
};

export default Goals;
