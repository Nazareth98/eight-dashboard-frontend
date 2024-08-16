import { useContext, useEffect } from "react";

import { customerContext } from "../../contexts/customerContext";

import ScreenContainer from "../../components/shared/screenContainer";
import CustomerLink from "../../components/customerLink";
import CustomerList from "../../components/customerList";
import CustomerInfo from "../../components/customerInfo";
import { chatbotContext } from "../../contexts/chatbotContext";

const Customers = () => {
  const { updateCustomers } = useContext(customerContext);
  const { updateContacts } = useContext(chatbotContext);

  useEffect(() => {
    const loadData = async () => {
      await updateCustomers();
      await updateContacts();
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
