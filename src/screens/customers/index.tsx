import { useContext, useEffect } from "react";

import { customerContext } from "../../contexts/customerContext";

import ScreenContainer from "../../components/shared/screenContainer";
import CustomerLink from "../../components/customerLink";
import CustomerList from "../../components/customerList";

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
      <CustomerList />
    </ScreenContainer>
  );
};

export default Customers;
