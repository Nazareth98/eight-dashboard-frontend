import { useContext, useEffect } from "react";
import MonthlyExpensesInfo from "../../components/monthlyExpensesInfo";
import MonthlyExpensesList from "../../components/monthlyExpensesList";
import ScreenContainer from "../../components/shared/screenContainer";
import { billToPayContext } from "../../contexts/billToPayContext";
import MonthlyExpensesManager from "../../components/monthlyExpensesManager";

const MonthlyExpenses = () => {
  const { updateBills, billToPayData, billType } = useContext(billToPayContext);

  useEffect(() => {
    async function loadData() {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      await updateBills(currentMonth, billType);
    }

    loadData();
  }, [billType]);

  return (
    <ScreenContainer>
      <MonthlyExpensesManager />
      <MonthlyExpensesInfo billToPayData={billToPayData} />
      <MonthlyExpensesList />
    </ScreenContainer>
  );
};

export default MonthlyExpenses;
