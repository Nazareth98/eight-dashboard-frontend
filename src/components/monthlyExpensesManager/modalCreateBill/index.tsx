import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { billToPayContext } from "../../../contexts/billToPayContext";
import CustomButton from "../../shared/customButton";
import IconClean from "../../../assets/svg/iconClean";
import IconAdd from "../../../assets/svg/iconAdd";
import CustomInput from "../../shared/customInput";
import CustomSubtitle from "../../shared/customSubtitle";
import CustomSelect from "../../shared/customSelect";
import { PlusCircle } from "lucide-react";
Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    alignItems: "center",
    padding: "40px",
    backgroundColor: "#131413",
    border: "none",
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    borderRadius: ".5rem",
  },
};

const ModalCreateBill = ({ isOpen, setIsOpen, billType }) => {
  const { createBillToPay, categoriesData } = useContext(billToPayContext);

  const [name, setName] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [value, setValue] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  async function handleCreateBill() {
    if (!name) {
      alert("O campo Nome é obrigatório!");
      return;
    }
    if (!dueDate) {
      alert("O campo Vencimento é obrigatório!");
      return;
    }
    if (!value) {
      alert("O campo Valor é obrigatório!");
      return;
    }
    if (!description) {
      alert("O campo Descrição é obrigatório!");
      return;
    }
    if (!selectedValue) {
      alert("O campo Categoria é obrigatório!");
      return;
    }

    try {
      const body = {
        name,
        dueDate,
        value: Number(value),
        description,
        categoryId: Number(selectedValue),
      };
      const response = await createBillToPay(body, billType);
      alert(response.message);
      cleanFields();
    } catch (error) {
      alert(error.message);
    }
  }

  function cleanFields() {
    setName("");
    setDueDate("");
    setValue(0);
    setDescription("");
  }

  function handleChange(e) {
    setSelectedValue(e.target.value);
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <div className="w-full">
        <CustomSubtitle
          icon={<IconAdd fill="fill-gray-500" width="25px" />}
          subtitle="Adiciona Conta à Pagar"
        />
      </div>
      <form className="w-[20rem] flex flex-col gap-4">
        <CustomInput
          placeholder="Patrick Bot"
          inputValue={name}
          setValue={setName}
          label="Nome:"
        />
        <CustomInput
          type="number"
          placeholder="1000"
          inputValue={value}
          setValue={setValue}
          label="Valor:"
        />
        <CustomInput
          type="date"
          placeholder="João"
          inputValue={dueDate}
          setValue={setDueDate}
          label="Vencimento:"
        />
        <CustomInput
          placeholder="Mensalidade"
          inputValue={description}
          setValue={setDescription}
          label="Descrição:"
        />
        <CustomSelect
          label="Selecione uma categoria"
          options={categoriesData}
          onChange={handleChange}
        />
      </form>
      <div className="h-full w-full flex items-end justify-end gap-4">
        <CustomButton onClick={handleCreateBill}>
          <PlusCircle className="size-4" />
          adicionar
        </CustomButton>
      </div>
    </Modal>
  );
};

export default ModalCreateBill;
