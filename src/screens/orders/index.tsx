import { useContext, useEffect, useState } from "react";
import ScreenContainer from "../../components/shared/screenContainer";
import { orderContext } from "../../contexts/orderContext";
import OrderList from "../../components/orderList";
import OrderShooting from "../../components/orderShooting";

const Orders = () => {
  const { getOrders } = useContext(orderContext);

  const [selectOrder, setSelectOrder] = useState();

  useEffect(() => {
    const loadData = async () => {
      await getOrders();
    };
    loadData();
  }, []);

  return (
    <ScreenContainer>
      <OrderList selectOrder={selectOrder} setSelectOrder={setSelectOrder} />
      <OrderShooting selectOrder={selectOrder} />
    </ScreenContainer>
  );
};

export default Orders;
