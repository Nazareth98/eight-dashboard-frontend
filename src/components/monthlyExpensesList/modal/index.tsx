import Modal from "react-modal";
import IconEdit from "../../../assets/svg/iconEdit";
import CustomButton from "../../shared/customButton";
import { useContext, useEffect, useState } from "react";
import CustomInput from "../../shared/customInput";
import CustomTextarea from "../../shared/customTextarea";
import BillToPayType from "../../../types/billToPayType";
import CustomSelect from "../../shared/customSelect";
import { billToPayContext } from "../../../contexts/billToPayContext";
import IconSafe from "../../../assets/svg/iconSafe";
import IconSave from "../../../assets/svg/iconSave";
import IconBack from "../../../assets/svg/iconBack";
import { ArrowLeft, Save } from "lucide-react";
Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Cor do overlay
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
    gap: "50px",
    alignItems: "center",
    padding: "40px",
    backgroundColor: "#131413",
    border: "none",
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    borderRadius: ".5rem",
  },
};

const ModalBillToPay = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [value, setValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const closeModal = () => {
    props.setIsOpen(false);
  };

  useEffect(() => {
    function loadData() {
      setName(props.data.name);
      setDescription(props.data.description);
      setDueDate(props.data.dueDate);
      setStatus(props.data.status);
      setValue(Number(props.data.value));
      setSelectedCategory(Number(props.data.categoryId));
    }

    if (props.data) {
      loadData();
    }
  }, [props]);

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="w-full flex items-center gap-2">
        <IconEdit width="30px" fill="fill-gray-700" />

        <h3 className="font-heading font-semibold text-gray-100 text-3xl">
          {props.data?.name}
        </h3>
      </div>

      <form className="flex flex-col gap-4 w-[30rem]">
        <CustomInput label="Nome" inputValue={name} setValue={setName} />
        <CustomInput
          label="Descrição"
          inputValue={description}
          setValue={setDescription}
        />
        <CustomInput label="Vencimento:" disabled={true} inputValue={dueDate} />
        <CustomInput
          label="Valor:"
          type="number"
          inputValue={value}
          setValue={setValue}
        />
        <CustomInput
          label="Status"
          disabled={true}
          inputValue={status === 0 ? "Pendente" : "Pago"}
        />
      </form>

      <div className="w-full flex items-center justify-end gap-8">
        <CustomButton theme="attention" onClick={closeModal}>
          <ArrowLeft className="size-4" />
          voltar
        </CustomButton>
        <CustomButton
          onClick={() =>
            props.onConfirm({
              id: props.data.id,
              description,
              value: Number(value),
              dueDate,
              status,
              name,
              categoryId: Number(selectedCategory),
            })
          }
        >
          <Save className="size-4" />
          salvar
        </CustomButton>
      </div>
    </Modal>
  );
};

export default ModalBillToPay;
