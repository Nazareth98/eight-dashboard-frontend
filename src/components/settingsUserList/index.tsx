import React, { useContext, useState } from "react";
import CustomSubtitle from "../shared/customSubtitle";
import IconUser from "../../assets/svg/iconUser";
import { userContext } from "../../contexts/userContext";
import IconEdit from "../../assets/svg/iconEdit";
import IconDelete from "../../assets/svg/iconDelete";
import ModalConfirm from "../shared/modal/modalConfirm";
import ModalEditUser from "./modalEditUser";
import CustomIconButton from "../shared/customIconButton";
import ComponentContainer from "../shared/componentContainer";
import { ListCheck, UserPlusIcon, Users } from "lucide-react";

const SettingsUserList = () => {
  const { userData, deleteUser } = useContext(userContext);

  const [selectUser, setSelectUser] = useState();

  const [editIsOpen, setEditIsOpen] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(
    "Deseja mesmo deletar esse Cambista?"
  );

  function handleEdit({ currentTarget }) {
    const selectId = Number(currentTarget.id);
    const currentUser = userData?.find((user) => user.id === selectId);
    setSelectUser(currentUser);
    setEditIsOpen(true);
  }

  function handleDelete({ currentTarget }) {
    const selectId = Number(currentTarget.id);
    const currentUser = userData?.find((user) => user.id === selectId);
    setSelectUser(currentUser);
    setModalConfirm(`Deseja deletar o usuário '${currentUser?.name}'?`);
    setModalIsOpen(true);
  }

  async function confirmDelete() {
    try {
      const result = await deleteUser(selectUser.id);
      if (result.status !== 200) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ComponentContainer cols="8" rows="12">
      <ModalConfirm
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        onConfirm={confirmDelete}
        message={modalConfirm}
      />
      <CustomSubtitle
        icon={<Users className="size-6" />}
        subtitle="Todos os Usuários"
      />
      <ModalEditUser
        isOpen={editIsOpen}
        setIsOpen={setEditIsOpen}
        userData={selectUser}
      />
      <div className="overflow-y-auto w-full h-full flex flex-col gap-4">
        {userData &&
          userData.map((user) => {
            return (
              <div
                key={user.id}
                className="border-l-4 border-2 border-gray-900 border-l-primary-400 rounded grid grid-cols-12 p-1 gap-2 transition-all fade-left hover:bg-gray-900 fade-left"
              >
                <div className="flex flex-col gap-2 p-2 col-span-3">
                  <span className="text-gray-500 text-xs font-semibold">
                    Nome
                  </span>
                  <p className="text-gray-100 text-sm font-heading">
                    {user.name} {user.lastname}
                  </p>
                </div>
                <div className="flex flex-col gap-2 p-2 col-span-2">
                  <span className="text-gray-500 text-xs font-semibold">
                    Cargo
                  </span>
                  <p className="text-gray-100 text-sm font-heading">
                    {user.position}
                  </p>
                </div>
                <div className="flex flex-col gap-2 p-2 col-span-1">
                  <span className="text-gray-500 text-xs font-semibold">
                    Nivel
                  </span>
                  <p className="text-gray-100 text-sm font-heading">
                    {user.accessLevel}
                  </p>
                </div>
                <div className="flex flex-col gap-2 p-2 col-span-3">
                  <span className="text-gray-500 text-xs font-semibold">
                    Email
                  </span>
                  <p className="text-gray-100 text-sm font-heading">
                    {user.email}
                  </p>
                </div>
                <div className="flex flex-col gap-2 p-2 col-span-2">
                  <span className="text-gray-500 text-xs font-semibold">
                    Telefone
                  </span>
                  <p className="text-gray-100 text-sm font-heading">
                    {user.phone}
                  </p>
                </div>
                <div className="flex flex-col gap-2 p-2 col-span-1">
                  <span className="text-gray-500 text-xs font-semibold">
                    Ações
                  </span>
                  <div className="flex items-center gap-1">
                    <CustomIconButton
                      id={user.id}
                      theme="attention"
                      onClick={handleEdit}
                    >
                      <IconEdit fill="fill-yellow-700" width="16px" />
                    </CustomIconButton>
                    <CustomIconButton
                      id={user.id}
                      theme="danger"
                      onClick={handleDelete}
                    >
                      <IconDelete fill="fill-red-700" width="16px" />
                    </CustomIconButton>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </ComponentContainer>
  );
};

export default SettingsUserList;
