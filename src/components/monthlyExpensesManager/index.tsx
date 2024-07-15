import { useContext, useState } from "react";
import CustomSubtitle from "../shared/customSubtitle";
import { billToPayContext } from "../../contexts/billToPayContext";
import IconSettings from "../../assets/svg/iconSettings";
import CustomButton from "../shared/customButton";
import IconOrders from "../../assets/svg/iconOrders";
import IconPayments from "../../assets/svg/iconPayments";
import IconAdd from "../../assets/svg/iconAdd";
import { formatCurrency } from "../../utils/generalsUtils";
import ModalCreateBill from "./modalCreateBill";
import ModalCreateCategory from "./modalCategory";
import IconCoin from "../../assets/svg/iconCoin";
import { Banknote, Database, PlusCircle, Wallet } from "lucide-react";

const MonthlyExpensesManager = () => {
  const { billResumeData, billType, toogleType } = useContext(billToPayContext);
  const [modalCategoryIsOpen, setModalCategoryIsOpen] = useState(false);
  const [modalBillIsOpen, setModalBillIsOpen] = useState(false);

  function handleCreateBill() {
    setModalBillIsOpen(true);
  }

  function handleCreateCategory() {
    setModalCategoryIsOpen(true);
  }

  return (
    <div className="col-span-3 row-span-12 p-6 rounded-xl border-2 border-gray-900 flex flex-col gap-6 fade-left">
      <ModalCreateBill
        billType={billType}
        isOpen={modalBillIsOpen}
        setIsOpen={setModalBillIsOpen}
      />

      <ModalCreateCategory
        billType={billType}
        isOpen={modalCategoryIsOpen}
        setIsOpen={setModalCategoryIsOpen}
      />
      <CustomSubtitle
        icon={<IconSettings fill="fill-gray-500" width="25px" />}
        subtitle="Gerenciador de gastos"
      />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 items-center pb-6">
          <span className="text-gray-500 font-medium:">
            Selecione o tipo de gasto
          </span>
          <div className="w-full flex items-center justify-center gap-4 font-heading font-semibold">
            <CustomButton
              theme={billType === "extra" ? "" : "alternate"}
              onClick={() => toogleType("extra")}
            >
              <Wallet className="size-4" />
              extras
            </CustomButton>

            <CustomButton
              theme={billType === "fixed" ? "" : "alternate"}
              onClick={() => toogleType("fixed")}
            >
              <Wallet className="size-4" />
              fixos
            </CustomButton>
          </div>
        </div>
        <div className="w-full flex flex-col gap-6">
          <CustomSubtitle
            icon={<IconAdd fill="fill-gray-500" width="25px" />}
            subtitle="Adicione informações"
          />
          <div className="w-full flex items-center justify-center gap-4 pb-4">
            <CustomButton onClick={handleCreateCategory} theme="attention">
              <PlusCircle className="size-4" />
              categorias
            </CustomButton>
            <CustomButton onClick={handleCreateBill} theme="attention">
              <Database className="size-4" />
              gasto
            </CustomButton>
          </div>
        </div>
      </div>
      <div className="h-full overflow-y-auto border-2 border-gray-900 rounded-lg">
        <ul className="p-4 ">
          {billResumeData?.map((item) => (
            <li className="py-2  text-gray-100  font-heading flex items-center gap-2 fade-left">
              <div>
                <IconPayments width="18px" fill="fill-gray-700" />
              </div>
              <p className="w-full"> {item.categoryName}</p>
              <span className="text-primary-400 font-medium">
                ${formatCurrency(item.value)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MonthlyExpensesManager;
