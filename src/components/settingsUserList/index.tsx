import React, { useContext } from "react";
import CustomSubtitle from "../shared/customSubtitle";
import IconUser from "../../assets/svg/iconUser";
import { userContext } from "../../contexts/userContext";
import IconEdit from "../../assets/svg/iconEdit";
import IconDelete from "../../assets/svg/iconDelete";

const SettingsUserList = () => {
  const { userData } = useContext(userContext);

  return (
    <div className="col-span-8 row-span-6 row-start-5 col-start-5 bg-gray-900 p-4 rounded-sm border-2 border-gray-800 flex flex-col gap-4">
      <CustomSubtitle
        icon={<IconUser fill="fill-primary-400" width="25px" />}
        subtitle="Todos os Usuários"
      />
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
                      fill="fill-primary-700 trasnsition-all hover:fill-primary-400"
                      width="20px"
                    />
                    <IconDelete
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
