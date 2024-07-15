import React, { useState } from "react";
import CustomButton from "../../customButton";
import IconDelete from "../../../../assets/svg/iconDelete";
import IconEdit from "../../../../assets/svg/iconEdit";
import ModalConfirm from "../../modal/modalConfirm";

const AccountCard = ({ data }) => {
  const [openActiveModal, setActiveModal] = useState(false);

  function limitString(str, limite) {
    if (str.length > limite) {
      return str.substring(0, limite);
    } else {
      return str;
    }
  }

  function activeAccount() {
    setActiveModal(true);
  }

  function confirmActiveAccount() {
    setActiveModal(false);
  }

  return (
    <div
      id={data.id}
      className="bg-gray-900 p-4 shadow-sm rounded flex flex-col gap-4 "
    >
      <ModalConfirm
        isOpen={openActiveModal}
        setIsOpen={setActiveModal}
        message="Deseja confirmar alteração de Conta ativa?"
        onConfirm={confirmActiveAccount}
      />
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-gray-100 text-lg">{data.name}</h4>
        {data.isActive ? (
          <CustomButton theme="alternate" disabled={true}>
            ATIVO
          </CustomButton>
        ) : (
          <CustomButton id={data.id} onClick={activeAccount}>
            ATIVAR
          </CustomButton>
        )}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-400">
          {limitString(data.message, 50)}...
        </span>
        <div className="flex items-center justify-between gap-2">
          <IconEdit
            width="25px"
            fill="fill-gray-400 cursor-pointer transition hover:fill-primary-300"
          />
          <IconDelete
            width="25px"
            fill="fill-gray-400 cursor-pointer transition hover:fill-primary-300"
          />
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
