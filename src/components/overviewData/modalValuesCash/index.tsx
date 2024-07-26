import Modal, { Styles } from "react-modal";
Modal.setAppElement("#root");

import { useContext, useEffect, useState } from "react";
import CustomButton from "../../shared/customButton";
import { overviewContext } from "../../../contexts/overviewContext";
import IconPdv from "../../../assets/svg/iconPdv";

import eua from "../../../assets/images/eua.png";
import argentina from "../../../assets/images/argentina.png";
import brasil from "../../../assets/images/brasil.png";
import paraguai from "../../../assets/images/paraguai.png";
import { formatCurrency } from "../../../utils/generalsUtils";
import { ArrowLeft } from "lucide-react";

const ModalValuesCash = (props) => {
  const { getValuesCash } = useContext(overviewContext);

  const [cash1, setCash1] = useState();
  const [cash2, setCash2] = useState();

  useEffect(() => {
    async function loadData() {
      const currentValues = await getValuesCash();
      setCash1(currentValues[0]);
      setCash2(currentValues[1]);
    }

    loadData();
  }, []);

  const customStyles: Styles = {
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
      boxShadow:
        "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      borderRadius: ".5rem",
    },
  };

  function closeModal() {
    props.setIsOpen(false);
  }

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="w-full flex items-center gap-2">
        <IconPdv width="40px" fill="fill-primary-400" />

        <h3 className="font-heading font-semibold text-gray-100 text-3xl">
          Valores por caixa
        </h3>
      </div>
      <div className="flex gap-4 w-[35rem] ">
        <div className="w-full border-2 border-gray-900 rounded-lg p-4">
          <div className="w-full pb-2 border-b-2 border-gray-900">
            <h3 className="text-center font-heading font-semibold text-gray-100">
              Caixa {cash1?.caixa}
            </h3>
          </div>
          <div className="py-4 flex flex-col gap-4">
            <div className="flex items-end justify-between">
              <img src={eua} className="h-[36px]" />
              <p className="text-gray-400 font-heading">
                US${" "}
                <span className="text-gray-100 text-xl">
                  {formatCurrency(cash1?.Dolares)}
                </span>
              </p>
            </div>
            <div className="flex items-end justify-between">
              <img src={brasil} className="h-[36px]" />
              <p className="text-gray-400 font-heading">
                R${" "}
                <span className="text-gray-100 text-xl">
                  {" "}
                  {formatCurrency(cash1?.Reais)}
                </span>
              </p>
            </div>
            <div className="flex items-end justify-between">
              <img src={argentina} className="h-[36px]" />
              <p className="text-gray-400 font-heading">
                PS${" "}
                <span className="text-gray-100 text-xl">
                  {formatCurrency(cash1?.Pesos)}
                </span>
              </p>
            </div>
            <div className="flex items-end justify-between">
              <img src={paraguai} className="h-[36px]" />
              <p className="text-gray-400 font-heading">
                GS${" "}
                <span className="text-gray-100 text-xl">
                  {formatCurrency(cash1?.Guaranis)}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="w-full border-2 border-gray-900 rounded-lg p-4">
          <div className="w-full pb-2 border-b-2 border-gray-900">
            <h3 className="text-center font-heading font-semibold text-gray-100">
              Caixa {cash2?.caixa}
            </h3>
          </div>
          <div className="py-4 flex flex-col gap-4">
            <div className="flex items-end justify-between">
              <img src={eua} className="h-[36px]" />
              <p className="text-gray-400 font-heading">
                US${" "}
                <span className="text-gray-100 text-xl">
                  {formatCurrency(cash2?.Dolares)}
                </span>
              </p>
            </div>
            <div className="flex items-end justify-between">
              <img src={brasil} className="h-[36px]" />
              <p className="text-gray-400 font-heading">
                R${" "}
                <span className="text-gray-100 text-xl">
                  {" "}
                  {formatCurrency(cash2?.Reais)}
                </span>
              </p>
            </div>
            <div className="flex items-end justify-between">
              <img src={argentina} className="h-[36px]" />
              <p className="text-gray-400 font-heading">
                PS${" "}
                <span className="text-gray-100 text-xl">
                  {formatCurrency(cash2?.Pesos)}
                </span>
              </p>
            </div>
            <div className="flex items-end justify-between">
              <img src={paraguai} className="h-[36px]" />
              <p className="text-gray-400 font-heading">
                GS${" "}
                <span className="text-gray-100 text-xl">
                  {formatCurrency(cash2?.Guaranis)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center gap-8">
        <CustomButton theme="danger" onClick={closeModal}>
          <ArrowLeft className="size-4" />
          voltar
        </CustomButton>
      </div>
    </Modal>
  );
};

export default ModalValuesCash;
