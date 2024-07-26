import { useEffect, useState } from "react";
import CustomSubtitle from "../shared/customSubtitle";
import {
  CalendarDays,
  CircleDollarSign,
  Percent,
  RefreshCcw,
  Search,
  Settings2,
} from "lucide-react";
import CustomButton from "../shared/customButton";
import CardIconInfo from "../shared/cardIconInfo";
import { formatCurrency } from "../../utils/generalsUtils";
import { PaymentType } from "../../types/paymentType";
import ComponentContainer from "../shared/componentContainer";

interface GoalsManagerProps {
  data: PaymentType[];
}

const GoalsManager = ({ data }: GoalsManagerProps) => {
  const [balanceDue, setBalanceDue] = useState<number>();
  const [pending, setPending] = useState<number>();
  const [percentagePaid, setPercentagePaid] = useState<number>();
  const [totalPaid, setTotalPaid] = useState<number>();

  useEffect(() => {
    function setData() {
      let balance = 0;
      let total = 0;
      let pend = 0;
      let percentage = 0;

      setBalanceDue(balance);
      setPending(pend);
      setPercentagePaid(percentage);
      setTotalPaid(total);
    }

    if (data) {
      setData();
    }
  }, [data]);

  return (
    <ComponentContainer cols="9" classToAdd="row-span-2">
      {data ? (
        <>
          {/* <div className="w-full  flex items-center justify-between gap-2"> */}
          {/* <CustomSubtitle
            subtitle="Gerenciar visualização"
            icon={<Settings2 className="size-6 text-gray-600" />}
          /> */}
          {/* <div className="flex gap-2 items-center">
              <CustomButton>
                <CalendarDays className="size-4" />
                no mês
              </CustomButton>
              <RefreshCcw className="size-4 text-gray-600" />
              <CustomButton theme="alternate">
                <CalendarDays className="size-4" />
                ao todo
              </CustomButton>
            </div> */}
          {/* </div> */}
          <div className="w-full h-full flex items-center gap-6">
            <CardIconInfo
              theme="red"
              icon={<CircleDollarSign className="size-5" />}
              label="Saldo devedor"
              data={`$${formatCurrency(100)}`}
            />
            <div className="h-8 w-2 bg-gray-900" />
            <CardIconInfo
              theme="green"
              icon={<CircleDollarSign className="size-5" />}
              label="Total Pago"
              data={`$${formatCurrency(100)}`}
            />
            <div className="h-8 w-2 bg-gray-900" />

            <CardIconInfo
              theme="yellow"
              icon={<CircleDollarSign className="size-5" />}
              label="Falta Pagar"
              data={`$${formatCurrency(100)}`}
            />
            <div className="h-8 w-2 bg-gray-900" />

            <CardIconInfo
              theme="orange"
              icon={<Percent className="size-5" />}
              label="Pago"
              data={`%${30}`}
            />
          </div>
        </>
      ) : (
        <div className="w-full h-full inset-0 text-gray-500 font-heading flex items-center justify-center gap-2 fade-left">
          <Search className="size-4" />
          <span>Busque por um cliente </span>
        </div>
      )}
    </ComponentContainer>
  );
};

export default GoalsManager;
