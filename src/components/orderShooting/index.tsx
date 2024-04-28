import CustomSubtitle from "../shared/customSubtitle";
import IconShooting from "../../assets/svg/iconShooting";
import CustomInput from "../shared/customInput";
import { useContext, useEffect, useState } from "react";
import CustomButton from "../shared/customButton";
import { orderContext } from "../../contexts/orderContext";

const OrderShooting = ({ selectOrder }) => {
  const { shootingOrder, getOrders } = useContext(orderContext);

  const [shipping, setShipping] = useState(0);

  const [orderId, setOrderId] = useState(0);
  const [customerId, setCustomerId] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [status, setStatus] = useState(0);
  const [total, setTotal] = useState(0);
  const [group, setGroup] = useState(null);
  const [contact, setContact] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (selectOrder) {
      setOrderId(selectOrder.id);
      setCustomerId(selectOrder.customerId);
      setCustomerName(selectOrder.customer);
      setStatus(selectOrder.status);
      setTotal(selectOrder.totalAmount);
      setGroup(selectOrder.group);
      setContact(selectOrder.contact);
      setProducts(selectOrder.products);
    }
  }, [selectOrder]);

  async function handleShooting() {
    if (!selectOrder) {
      alert("É necessário selecionar um pedido!");
      return;
    }
    const id = Number(selectOrder.id);
    const result = await shootingOrder(id, shipping);
    if (result.status !== 200) {
      alert(result.message);
      return;
    }
    console.log(result);
    await getOrders();
    alert("Pedido disparado com sucesso!");
  }

  return (
    <div className="col-span-5 row-span-12 bg-gray-900 p-4 rounded-sm border-2 border-gray-800 flex flex-col gap-4">
      <CustomSubtitle
        icon={<IconShooting fill="fill-primary-400" width="25px" />}
        subtitle="Disparar Pedido"
      />
      <form className="w-full grid grid-cols-12 gap-4">
        <CustomInput
          colSpan="2"
          placeholder="123"
          label="Pedido:"
          inputValue={orderId}
          disabled
        />
        <CustomInput
          colSpan="7"
          placeholder="João"
          label="Cliente:"
          inputValue={customerName}
          disabled
        />
        <CustomInput
          colSpan="3"
          placeholder="Faturado"
          label="Status:"
          inputValue={status === 9 ? "Faturado" : "Pendente"}
          disabled
        />
        <CustomInput
          colSpan="4"
          placeholder="Zap do João"
          label="Contato:"
          inputValue={contact ? contact.name : "Não possui"}
          disabled
        />
        <CustomInput
          colSpan="8"
          placeholder="Grupo Cliente João"
          label="Grupo:"
          inputValue={group ? group.name : "Não possui"}
          disabled
        />
      </form>
      <div className="w-full h-[90rem] p-4 flex flex-col gap-2 overflow-y-auto bg-gray-950 rounded border-2 border-gray-700 ">
        {products.length > 0 &&
          products.map((product) => (
            <div className="bg-gray-900 border-2 border-gray-800 p-1 rounded grid grid-cols-12 gap-2">
              <div className="col-span-1 text-sm text-gray-200">
                {product.productId}
              </div>
              <div className="col-span-6 text-sm text-gray-200">
                {product.productDesc}
              </div>
              <div className="col-span-2 text-sm text-gray-200">
                {product.amount}un
              </div>
              <div className="col-span-1 text-sm text-gray-200">
                ${product.price.toFixed(2)}
              </div>
              <div className="col-span-2 text-sm text-primary-400">
                ${product.total.toFixed(2)}
              </div>
            </div>
          ))}
      </div>
      <div className="w-full flex gap-4">
        <div className="w-1/3">
          <CustomInput
            type="number"
            placeholder="0"
            label="Frete: (%)"
            inputValue={shipping}
            setValue={setShipping}
          />
        </div>
        <div className="w-2/3 flex flex-col items-end justify-end ">
          <span className="text-gray-300 font-medium">Total:</span>
          <h2 className="text-primary-400 font-heading text-4xl font-semibold">
            ${total ? total.toFixed(2) : "0.00"}
          </h2>
        </div>
      </div>

      <div className="w-full h-full flex items-end justify-end">
        <CustomButton onClick={handleShooting}>
          <IconShooting fill="fill-primary-400" />
          Disparar Pedido
        </CustomButton>
      </div>
    </div>
  );
};

export default OrderShooting;

// {
//     "status": 200,
//     "message": "Pedido consultado com sucesso!",
//     "result": {
//         "id": 3544,
//         "customerId": 1,
//         "customer": "ABBAS FAHS TELEMAX",
//         "status": 0,
//         "totalAmount": 9,
//         "products": [
//             {
//                 "productId": 3451,
//                 "productDesc": "LOST MARY MO10.000 APPLE GUAVA",
//                 "subcategory": "10000 PUFFS",
//                 "amount": 1,
//                 "price": 9,
//                 "total": 9
//             }
//         ],
//         "contact": null,
//         "group": null,
//         "wasSent": 0
//     }
// }
