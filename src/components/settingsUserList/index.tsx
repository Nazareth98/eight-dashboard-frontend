import React, { useContext, useState } from "react";
import CustomSubtitle from "../shared/customSubtitle";
import IconUser from "../../assets/svg/iconUser";
import { userContext } from "../../contexts/userContext";
import IconEdit from "../../assets/svg/iconEdit";
import IconDelete from "../../assets/svg/iconDelete";
import ModalConfirm from "../shared/modal/modalConfirm";
import ModalEditUser from "./modalEditUser";

const SettingsUserList = () => {
  const { userData, deleteUser } = useContext(userContext);

  const [selectUser, setSelectUser] = useState();

  const [warningIsOpen, setWarningIsOpen] = useState(false);
  const [modalWarning, setModalWarning] = useState("");

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(
    "Deseja mesmo deletar esse Cambista?"
  );

  function handleDelete({ currentTarget }) {
    const selectId = Number(currentTarget.id);
    console.log(userData);
    const currentUser = userData?.find((user) => user.id === selectId);
    console.log(selectId, currentUser);
    setSelectUser(currentUser);
    setModalConfirm(`Deseja deletar o usuário '${currentUser?.name}'?`);
    setModalIsOpen(true);
  }

  async function confirmDelete() {
    try {
      const result = await deleteUser(selectExchanger.id);
      if (result.status !== 200) {
        setModalWarning(result.message);
        setModalIsOpen(true);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-[52rem] col-span-8 row-span-12 col-start-5 bg-gray-900 p-6 rounded-xl border-2 border-gray-800 flex flex-col gap-4">
      <ModalConfirm
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        onConfirm={confirmDelete}
        message={modalConfirm}
      />
      <CustomSubtitle
        icon={<IconUser fill="fill-primary-400" width="25px" />}
        subtitle="Todos os Usuários"
      />
      <ModalEditUser userData={selectUser}></ModalEditUser>
      <div className="overflow-y-auto w-full h-full flex flex-col gap-4">
        {userData &&
          userData.map((user) => {
            return (
              <div
                key={user.id}
                className="bg-gray-950 rounded grid grid-cols-12 gap-2 "
              >
                <div className="flex flex-col gap-2 p-2 col-span-3">
                  <span className="text-gray-500 text-xs font-semibold">
                    Nome
                  </span>
                  <p className="text-gray-100 text-sm">
                    {user.name} {user.lastname}
                  </p>
                </div>
                <div className="flex flex-col gap-2 p-2 col-span-2">
                  <span className="text-gray-500 text-xs font-semibold">
                    Cargo
                  </span>
                  <p className="text-gray-100 text-sm">{user.position}</p>
                </div>
                <div className="flex flex-col gap-2 p-2 col-span-1">
                  <span className="text-gray-500 text-xs font-semibold">
                    Nivel
                  </span>
                  <p className="text-gray-100 text-sm">{user.accessLevel}</p>
                </div>
                <div className="flex flex-col gap-2 p-2 col-span-3">
                  <span className="text-gray-500 text-xs font-semibold">
                    Email
                  </span>
                  <p className="text-gray-100 text-sm">{user.email}</p>
                </div>
                <div className="flex flex-col gap-2 p-2 col-span-2">
                  <span className="text-gray-500 text-xs font-semibold">
                    Telefone
                  </span>
                  <p className="text-gray-100 text-sm">{user.phone}</p>
                </div>
                <div className="flex flex-col gap-2 p-2 col-span-1">
                  <span className="text-gray-500 text-xs font-semibold">
                    Ações
                  </span>
                  <div className="flex items-center gap-1">
                    <IconEdit
                      id={user.id}
                      fill="fill-primary-700 trasnsition-all hover:fill-primary-400"
                      width="20px"
                    />
                    <IconDelete
                      id={user.id}
                      onClick={handleDelete}
                      fill="fill-red-800 transition-all hover:fill-red-600"
                      width="20px"
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SettingsUserList;
