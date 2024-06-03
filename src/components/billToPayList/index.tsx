import { useContext, useEffect, useState } from "react";
import { billToPayContext } from "../../contexts/billToPayContext";
import CustomSubtitle from "../shared/customSubtitle";
import IconOrders from "../../assets/svg/iconOrders";
import IconDelete from "../../assets/svg/iconDelete";
import IconPayments from "../../assets/svg/iconPayments";
import ModalConfirm from "../shared/modal/modalConfirm";
import { formatCurrency, getLastSixMonths } from "../../utils/generalsUtils";
import IconEdit from "../../assets/svg/iconEdit";
import ModalBillToPay from "./modal";
import IconArrowLeft from "../../assets/svg/iconArrowLeft";
import IconArrowRight from "../../assets/svg/iconArrowRight";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const BillsToPayList = () => {
  const {
    updateData,
    billToPayData,
    updateBillToPayStatus,
    deleteBillToPay,
    updateBillToPayData,
  } = useContext(billToPayContext);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
  const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState(false);

  const [modalMessage, setModalMessage] = useState("");

  const [selectedBill, setSelectBill] = useState();

  const [currentPage, setCurrentPage] = useState();

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    setCurrentPage(currentMonth);
    updateData(currentMonth);
  }, []);

  function handleDelete({ currentTarget }) {
    const id = currentTarget.id;
    const bill = billToPayData?.find((bill) => bill.id == id);
    setSelectBill(bill);
    setModalMessage(
      `Deseja deletar a despesa "${bill.name}" no valor de $${bill.value}?`
    );
    setModalDeleteIsOpen(true);
  }

  async function confirmDelete() {
    console.log("deleção confirmada");
    const response = await deleteBillToPay(selectedBill.id);
    alert(response.message);
  }

  function handlePay({ currentTarget }) {
    const id = currentTarget.id;
    const bill = billToPayData?.find((bill) => bill.id == id);
    setSelectBill(bill);
    setModalMessage(
      `Deseja confirmar o pagamento da despesa "${bill.name}" no valor de $${bill.value}?`
    );
    setModalIsOpen(true);
  }

  function handleUpdate({ currentTarget }) {
    const id = currentTarget.id;
    const bill = billToPayData?.find((bill) => bill.id == id);
    console.log(bill);
    setSelectBill(bill);
    setModalUpdateIsOpen(true);
  }

  async function confirmPayment() {
    const response = await updateBillToPayStatus(selectedBill.id);
    alert(response.message);
  }

  async function confirmUpdate(bill) {
    console.log(bill);
    const response = await updateBillToPayData(bill);
    alert(response.message);
  }

  function handleNextPage() {
    const nextPage = monthNames[currentPage];
    console.log(currentPage);
    console.log(nextPage);
    if (nextPage) {
      console.log(nextPage);
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      updateData(newPage);
    }
  }

  async function handleBackPage() {
    const backPage = monthNames[currentPage - 2];
    console.log(currentPage);
    console.log(backPage);
    if (backPage) {
      console.log(backPage);
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      updateData(newPage);
    }
  }

  return (
    <div className="col-span-9 row-span-10 bg-gray-900 p-6 rounded-xl border-2 border-gray-800 flex flex-col gap-4">
      <ModalConfirm
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        onConfirm={confirmPayment}
        message={modalMessage}
      />
      <ModalConfirm
        isOpen={modalDeleteIsOpen}
        setIsOpen={setModalDeleteIsOpen}
        onConfirm={confirmDelete}
        message={modalMessage}
      />
      <ModalBillToPay
        isOpen={modalUpdateIsOpen}
        setIsOpen={setModalUpdateIsOpen}
        data={selectedBill}
        onConfirm={confirmUpdate}
      />
      <CustomSubtitle
        icon={<IconOrders fill="fill-gray-500" width="25px" />}
        subtitle="Contas do Mês Atual"
      />
      <div className="h-[35rem] overflow-y-auto flex flex-col gap-4 pr-4">
        {billToPayData?.map((bill) => {
          return (
            <div
              id={bill.id}
              className="border-l-4 border-2 border-gray-950 border-l-primary-400 rounded grid grid-cols-12 p-1 gap-2 transition-all bg-gray-950"
            >
              <div className="flex flex-col gap-2 p-2 col-span-2">
                <span className={`text-gray-500 text-xs font-semibold`}>
                  Nome
                </span>
                <p className="text-gray-100 text-sm">{bill.name}</p>
              </div>
              <div className="flex flex-col gap-2 p-2 col-span-2">
                <span className={`text-gray-500 text-xs font-semibold`}>
                  Valor
                </span>
                <p className="text-primary-400 text-sm">
                  ${formatCurrency(bill.value)}
                </p>
              </div>
              <div className="flex flex-col gap-2 p-2 col-span-4">
                <span className={`text-gray-500 text-xs font-semibold`}>
                  Descrição
                </span>
                <p className="text-gray-100 text-sm">{bill.description}</p>
              </div>
              <div className="flex flex-col gap-2 p-2 col-span-2">
                <span className={`text-gray-500 text-xs font-semibold`}>
                  Vencimento
                </span>
                <p
                  className={
                    bill.status === 1
                      ? "text-gray-100 text-sm"
                      : "text-yellow-400 text-sm"
                  }
                >
                  {bill.dueDate}
                </p>
              </div>
              <div className="flex flex-col gap-2 p-2 col-span-1">
                <span className={`text-gray-500 text-xs font-semibold`}>
                  Status
                </span>
                <p
                  className={
                    bill.status === 1
                      ? "text-primary-400 text-sm"
                      : "text-yellow-400 text-sm"
                  }
                >
                  {bill.status === 1 ? "Pago" : "Pendente"}
                </p>
              </div>
              <div className="flex flex-col gap-2 p-2 col-span-1">
                <span className={`text-gray-500 text-xs font-semibold`}>
                  Ações
                </span>
                <div className="flex items-center gap-1">
                  <IconPayments
                    id={bill.id}
                    onClick={handlePay}
                    fill={
                      bill.status === 1
                        ? "fill-gray-700"
                        : "fill-primary-700 trasnsition-all hover:fill-primary-400  cursor-pointer"
                    }
                    width="20px"
                  />
                  <IconEdit
                    id={bill.id}
                    onClick={handleUpdate}
                    fill="fill-yellow-600 trasnsition-all hover:fill-yellow-400  cursor-pointer"
                    width="20px"
                  />
                  <IconDelete
                    id={bill.id}
                    onClick={bill.status === 1 ? null : handleDelete}
                    fill={
                      bill.status === 1
                        ? "fill-gray-700"
                        : "fill-red-600 trasnsition-all hover:fill-red-500 cursor-pointer"
                    }
                    width="20px"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full flex items-center justify-center gap-2">
        <IconArrowLeft
          onClick={handleBackPage}
          fill="fill-gray-700 cursor-pointer transition-all hover:fill-primary-400 active:fill-primary-300 active:-translate-x-1"
        />
        <div className="p-2 text-lg text-primary-400 font-semibold">
          {currentPage ? monthNames[currentPage - 1] : "teste"}
        </div>
        <IconArrowRight
          onClick={handleNextPage}
          fill="fill-gray-700 cursor-pointer transition-all hover:fill-primary-400 active:fill-primary-300 active:translate-x-1"
        />
      </div>
    </div>
  );
};

export default BillsToPayList;
