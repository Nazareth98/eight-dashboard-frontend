import { useContext, useEffect } from "react";

import { customerContext } from "../../contexts/customerContext";

import ScreenContainer from "../../components/shared/screenContainer";
import CustomerLink from "../../components/customerLink";
import CustomerList from "../../components/customerList";
import { contactsContext } from "../../contexts/contactsContext";
import CustomerInfo from "../../components/customerInfo";

const Customers = () => {
  const { getCustomers } = useContext(customerContext);
  const { updateData } = useContext(contactsContext);

  useEffect(() => {
    const loadData = async () => {
      await getCustomers();
      await updateData();
    };
    loadData();
  }, []);

  return (
    <ScreenContainer>
      <CustomerLink />
      <CustomerInfo />
      <CustomerList />
    </ScreenContainer>
  );
};

export default Customers;
