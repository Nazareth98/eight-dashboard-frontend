import { useContext, useEffect } from "react";
import CustomerLink from "../../components/customerLink";
import ScreenContainer from "../../components/shared/screenContainer";
import { customerContext } from "../../contexts/customerContext";

const Customers = () => {
  const { getCustomers } = useContext(customerContext);

  useEffect(() => {
    const loadData = async () => {
      await getCustomers();
    };
    loadData();
  }, []);

  return (
    <ScreenContainer>
      <CustomerLink />
    </ScreenContainer>
  );
};

export default Customers;
