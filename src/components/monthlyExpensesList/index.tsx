import { useContext, useEffect, useState } from "react";
import { billToPayContext } from "../../contexts/billToPayContext";
import CustomSubtitle from "../shared/customSubtitle";
import IconOrders from "../../assets/svg/iconOrders";
import IconDelete from "../../assets/svg/iconDelete";
import IconPayments from "../../assets/svg/iconPayments";
import ModalConfirm from "../shared/modal/modalConfirm";
import { formatCurrency } from "../../utils/generalsUtils";
import IconEdit from "../../assets/svg/iconEdit";
import ModalBillToPay from "./modal";
import IconArrowLeft from "../../assets/svg/iconArrowLeft";
import IconArrowRight from "../../assets/svg/iconArrowRight";
import CustomIconButton from "../shared/customIconButton";
import Loading from "../shared/loading";
import ComponentContainer from "../shared/componentContainer";

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

const MonthlyExpensesList = () => {
  const {
    updateData,
    billToPayData,
    updateBillToPayStatus,
    deleteBillToPay,
    updateBillToPayData,
    billType,
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
    updateData(currentMonth, billType);
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
    const response = await deleteBillToPay(selectedBill, billType);
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
    setSelectBill(bill);
    setModalUpdateIsOpen(true);
  }

  async function confirmPayment() {
    const response = await updateBillToPayStatus(selectedBill.id, billType);
    alert(response.message);
  }

  async function confirmUpdate(bill) {
    const response = await updateBillToPayData(bill, billType, selectedBill.id);
    alert(response.message);
  }

  function handleNextPage() {
    const nextPage = monthNames[currentPage];
    if (nextPage) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      updateData(newPage, billType);
    }
  }

  async function handleBackPage() {
    const backPage = monthNames[currentPage - 2];
    if (backPage) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      updateData(newPage, billType);
    }
  }

  return (
    <ComponentContainer classToAdd="col-span-9 row-span-10">
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
        subtitle={`Contas ${billType === "fixed" ? "Fixas" : "Extras"} do Mês`}
      />

      {!billToPayData ? (
        <Loading />
      ) : (
        <>
          <div className="h-[35rem] overflow-y-auto flex flex-col gap-4 pr-4 fade-left">
            {billToPayData?.map((bill) => {
              return (
                <div
                  id={bill.id.toString()}
                  key={bill.description}
                  className="border-l-4 border-2 border-gray-900 border-l-primary-400 rounded grid grid-cols-12 p-1 gap-2 transition-all fade-left hover:bg-gray-900"
                >
                  <div className="flex flex-col gap-2 p-2 col-span-2">
                    <span className={`text-gray-500 text-xs font-semibold`}>
                      Nome
                    </span>
                    <p className="text-gray-100 font-heading text-sm">
                      {bill.name}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 p-2 col-span-1">
                    <span className={`text-gray-500 text-xs font-semibold`}>
                      Valor
                    </span>
                    <p className="text-primary-400 text-sm font-heading">
                      ${formatCurrency(bill.value)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 p-2 col-span-3">
                    <span className={`text-gray-500 text-xs font-semibold`}>
                      Descrição
                    </span>
                    <p className="text-gray-100 text-sm font-heading">
                      {bill.description}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 p-2 col-span-2">
                    <span className={`text-gray-500 text-xs font-semibold`}>
                      Categoria
                    </span>
                    <p className="text-gray-100 text-sm font-heading">
                      {bill.categoryName}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 p-2 col-span-1">
                    <span className={`text-gray-500 text-xs font-semibold`}>
                      Vencimento
                    </span>
                    <p className="text-gray-100 text-sm font-heading">
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
                          ? "text-primary-400 text-sm font-heading"
                          : "text-yellow-400 text-sm font-heading"
                      }
                    >
                      {bill.status === 1 ? "Pago" : "Pendente"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 p-2 col-span-2">
                    <span className={`text-gray-500 text-xs font-semibold`}>
                      Ações
                    </span>
                    <div className="flex items-center gap-2">
                      <CustomIconButton
                        theme={bill.status === 1 ? "alternate" : ""}
                      >
                        <IconPayments
                          id={bill.id}
                          onClick={handlePay}
                          fill={
                            bill.status === 1
                              ? "fill-gray-700"
                              : "fill-primary-700 cursor-pointer"
                          }
                          width="14px"
                        />
                      </CustomIconButton>

                      <CustomIconButton theme="attention">
                        <IconEdit
                          id={bill.id}
                          onClick={handleUpdate}
                          fill="fill-yellow-700 cursor-pointer"
                          width="14px"
                        />
                      </CustomIconButton>
                      <CustomIconButton theme="danger">
                        <IconDelete
                          id={bill.id}
                          onClick={handleDelete}
                          fill="fill-red-700 trasnsition-all hover:fill-red-500 cursor-pointer"
                          width="14px"
                        />
                      </CustomIconButton>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full flex items-center justify-center gap-2">
            <div
              onClick={handleBackPage}
              className="cursor-pointer p-1 bg-gray-950 border-2 border-gray-800 rounded-lg fill-gray-700 transition-all hover:border-gray-700 hover:fill-gray-700 active:border-primary-500 active:fill-primary-500 active:-translate-x-1"
            >
              <IconArrowLeft width="16px" fill="transition-all" />
            </div>
            <div className="p-2 text-lg w-12 text-center text-gray-400 font-semibold">
              {currentPage ? monthNames[currentPage - 1] : "teste"}
            </div>
            <div
              onClick={handleNextPage}
              className="cursor-pointer p-1 bg-gray-950 border-2 border-gray-800 rounded-lg fill-gray-700 transition-all hover:border-gray-700 hover:fill-gray-700 active:border-primary-500 active:fill-primary-500 active:translate-x-1"
            >
              <IconArrowRight width="16px" fill="transition-all" />
            </div>
          </div>
        </>
      )}
    </ComponentContainer>
  );
};

export default MonthlyExpensesList;
