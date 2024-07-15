import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { billToPayContext } from "../../../contexts/billToPayContext";
import CustomButton from "../../shared/customButton";
import IconClean from "../../../assets/svg/iconClean";
import IconAdd from "../../../assets/svg/iconAdd";
import CustomInput from "../../shared/customInput";
import CustomSubtitle from "../../shared/customSubtitle";
import CustomSelect from "../../shared/customSelect";
import IconDelete from "../../../assets/svg/iconDelete";
import IconEdit from "../../../assets/svg/iconEdit";
import CustomIconButton from "../../shared/customIconButton";
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

const ModalCreateCategory = ({ isOpen, setIsOpen, billType }) => {
  const { createCategory, categoriesData, deleteCategory } =
    useContext(billToPayContext);

  const [name, setName] = useState<string>("");

  function closeModal() {
    setIsOpen(false);
  }

  async function handleDeleteCategory({ currentTarget }) {
    try {
      const id = Number(currentTarget.id);
      await deleteCategory(id, billType);
      alert("Categoria excluída com sucesso!");
      cleanFields();
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleCreateCategory() {
    if (!name) {
      alert("O campo Nome é obrigatório!");
      return;
    }

    try {
      const body = {
        name,
      };
      const response = await createCategory(body, billType);
      alert(response.message);
      cleanFields();
    } catch (error) {
      alert(error.message);
    }
  }

  function cleanFields() {
    setName("");
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <div className="w-full">
        <CustomSubtitle
          icon={<IconAdd fill="fill-gray-500" width="25px" />}
          subtitle="Adicionar categoria"
        />
      </div>
      <div className="flex flex-col gap-4">
        <form className="w-[20rem] flex flex-col gap-4">
          <CustomInput
            placeholder="Patrick Bot"
            inputValue={name}
            setValue={setName}
            label="Nome:"
          />
        </form>
        <CustomButton onClick={handleCreateCategory}>
          <PlusCircle className="size-4" />
          adicionar
        </CustomButton>
      </div>

      <ul className="bg-gray-950 rounded h-64 overflow-y-auto w-full flex flex-col gap-4">
        {categoriesData?.map((category) => (
          <li>
            <div className="bg-gray-900 p-3 flex rounded-lg items-center justify-between">
              <p className="text-gray-200 font-semibold">{category.name}</p>
              <div className="flex items-center gap-2">
                <CustomIconButton
                  id={category.id}
                  onClick={handleDeleteCategory}
                  theme="danger"
                >
                  <IconDelete width="16px" fill="fill-red-700" />
                </CustomIconButton>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Modal>
  );
};

export default ModalCreateCategory;
