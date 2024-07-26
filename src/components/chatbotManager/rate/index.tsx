import {
  ArrowLeftCircle,
  BadgeDollarSign,
  CircleDollarSign,
  DollarSign,
  Edit,
  Radio,
  RefreshCcw,
  Settings,
  Settings2,
} from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import CustomInput from "../../shared/customInput";
import CustomButton from "../../shared/customButton";
import { formatCurrency } from "../../../utils/generalsUtils";
import { chatbotContext } from "../../../contexts/chatbotContext";
import RateType from "../../../types/rateType";

const Rate = () => {
  const { updateRate, rate } = useContext(chatbotContext);
  const [openInputRate, setOpenInputRate] = useState<boolean>(false);
  const [inputRate, setInputRate] = useState<number>();

  function handleOpenInputRate() {
    setOpenInputRate(true);
  }
  function handleCloseInputRate() {
    setOpenInputRate(false);
  }

  const handleUpdateRate = async () => {
    if (!inputRate) {
      alert("O valor da Taxa é obrigatório.");
      return;
    }
    await updateRate(inputRate);
    setInputRate(0);
    setOpenInputRate(false);
  };

  return (
    <div className="w-full flex flex-col gap-2 font-heading justify-center transition-all">
      <h3 className="text-gray-500 font-heading flex items-center gap-2">
        <CircleDollarSign className="size-4" />
        Taxa
      </h3>
      <div className="flex gap-2 items-center">
        <div>
          <CircleDollarSign className="size-8 text-primary-400" />
        </div>
        {openInputRate ? (
          <>
            <div className="w-full flex gap-2">
              <CustomInput
                type="number"
                placeholder="0,00"
                inputValue={inputRate}
                setValue={setInputRate}
              />
              <CustomButton onClick={handleUpdateRate}>
                <RefreshCcw className="size-5" />
              </CustomButton>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-gray-100 text-3xl font-semibold">
              ${rate ? formatCurrency(rate.value, "pt-BR", "BRL") : null}
            </h3>
            <div>
              <Edit
                onClick={handleOpenInputRate}
                className="size-4 text-gray-600 cursor-pointer transition-all hover:text-gray-400"
              />
            </div>
          </>
        )}
      </div>
      {openInputRate && (
        <div
          onClick={handleCloseInputRate}
          className="flex items-center gap-2 text-gray-700 cursor-pointer transition-all hover:text-gray-400 text-sm"
        >
          <ArrowLeftCircle className="size-4" />
          Voltar
        </div>
      )}
    </div>
  );
};

export default Rate;
