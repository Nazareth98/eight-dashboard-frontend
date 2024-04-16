import React, { useContext, useState } from "react";
import { exchangerContext } from "../../contexts/exchangerContext";
import CustomSubtitle from "../shared/customSubtitle";
import IconGroups from "../../assets/svg/iconGroups";
import IconEdit from "../../assets/svg/iconEdit";
import IconDelete from "../../assets/svg/iconDelete";
import ModalConfirm from "../shared/modal/modalConfirm";
import ModalWarning from "../shared/modal/modalWarning";

const ExchangerList = () => {
  const { exchangerData, deleteExchanger } = useContext(exchangerContext);

  const [selectExchanger, setSelectExchanger] = useState();

  const [warningIsOpen, setWarningIsOpen] = useState(false);
  const [modalWarning, setModalWarning] = useState("");

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(
    "Deseja mesmo deletar esse Cambista?"
  );

  function handleDelete({ currentTarget }) {
    const selectId = Number(currentTarget.id);
    const currentExchanger = exchangerData?.find(
      (exchanger) => exchanger.id === selectId
    );
    setSelectExchanger(currentExchanger);
    setModalConfirm(`Deseja deletar o cambista '${currentExchanger?.name}'?`);
    setModalIsOpen(true);
  }

  async function confirmDelete() {
    try {
      const result = await deleteExchanger(selectExchanger.id);
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
    <div className="col-span-4 row-span-6 col-start-1 bg-gray-900 p-4 rounded-sm border-2 border-gray-800 flex flex-col gap-4">
      <ModalConfirm
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        onConfirm={confirmDelete}
        message={modalConfirm}
      />
      <ModalWarning
        isOpen={warningIsOpen}
        setIsOpen={setWarningIsOpen}
        message={modalWarning}
      />
      <CustomSubtitle
        icon={<IconGroups fill="fill-primary-400" width="25px" />}
        subtitle="Todos os Cambistas"
      />
      <div className="overflow-y-auto flex flex-col gap-4 pr-4">
        {exchangerData &&
          exchangerData.map((exchanger) => {
            return (
              <div
                id={exchanger.id}
                className="bg-gray-950 rounded grid grid-cols-12 gap-2"
              >
                <div className="flex flex-col gap-2 p-2 col-span-7">
                  <span className="text-gray-500 text-xs font-semibold">
                    Nome
                  </span>
                  <p className="text-gray-100 text-sm">{exchanger.name}</p>
                </div>
                <div className="flex flex-col gap-2 p-2 col-span-3">
                  <span className="text-gray-500 text-xs font-semibold">
                    Saldo
                  </span>
                  <p
                    className={
                      exchanger.balance > 0
                        ? "text-primary-500 text-sm"
                        : exchanger.balance < 0
                        ? "text-red-800"
                        : `text-gray-600`
                    }
                  >
                    ${exchanger.balance}
                  </p>
                </div>
                <div className="flex flex-col gap-2 p-2 col-span-2">
                  <span className="text-gray-500 text-xs font-semibold">
                    Ações
                  </span>

                  <IconDelete
                    id={exchanger.id}
                    onClick={handleDelete}
                    fill="fill-red-800 transition-all hover:fill-red-600"
                    width="20px"
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ExchangerList;
