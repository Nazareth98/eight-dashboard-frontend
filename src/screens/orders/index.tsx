import { useContext, useEffect, useState } from "react";
import ScreenContainer from "../../components/shared/screenContainer";
import { orderContext } from "../../contexts/orderContext";
import OrderList from "../../components/orderList";

const Orders = () => {
  const { getOrders, orderData } = useContext(orderContext);

  const [selectOrder, setSelectOrder] = useState();

  useEffect(() => {
    const loadData = async () => {
      await getOrders();
    };
    loadData();
  }, []);

  function handleSelectOrder({ currentTarget }) {
    const id = Number(currentTarget.id);
    const currentOrder = orderData?.filter((order) => order.id === id);
    setSelectOrder(currentOrder[0]);
  }

  return (
    <ScreenContainer>
      <OrderList onSelect={handleSelectOrder} />
    </ScreenContainer>
  );
};

export default Orders;
