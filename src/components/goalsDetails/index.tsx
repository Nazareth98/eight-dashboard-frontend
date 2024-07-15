import { useEffect, useState } from "react";
import { PaymentType } from "../../types/paymentType";
import { formatCurrency } from "../../utils/generalsUtils";
import CustomSubtitle from "../shared/customSubtitle";
import {
  Banknote,
  BarChart2,
  ClipboardCheck,
  Diff,
  Goal,
  MousePointer,
  MousePointer2,
  Pointer,
  PointerIcon,
  Search,
  SearchIcon,
  UserCircle,
  UserCircle2,
} from "lucide-react";

interface GoalsDetailsProps {
  data: PaymentType[];
}

const GoalsDetails = ({ data }: GoalsDetailsProps) => {
  const [totalPayments, setTotalPayments] = useState<number>();
  const [totalAmountReceived, setTotalAmountReceived] = useState<number>();
  const [latePayments, setLatePayments] = useState<number>();
  const [onTimePayments, setOnTimePayments] = useState<number>();

  useEffect(() => {
    function setData() {
      const totalPayments = data.length;
      const totalAmountReceived = data.reduce(
        (acc, payment) => acc + payment.value,
        0
      );
      const latePayments = data.filter(
        (payment) => new Date(payment.payDay) > new Date(payment.dueDate)
      ).length;
      const onTimePayments = data.filter(
        (payment) => new Date(payment.payDay) <= new Date(payment.dueDate)
      ).length;

      setTotalPayments(totalPayments);
      setTotalAmountReceived(totalAmountReceived);
      setLatePayments(latePayments);
      setOnTimePayments(onTimePayments);
    }

    if (data) setData();
  }, [data]);

  return (
    <div className="col-span-3 row-span-8 p-6 rounded-xl border-2 border-gray-900 flex flex-col gap-10 fade-left">
      {data ? (
        <>
          <CustomSubtitle
            icon={<UserCircle2 className="size-6 text-gray-600 fade-right" />}
            subtitle={data[0]?.customerName}
          />

          <div className="w-full h-full flex flex-col items-start gap-4">
            <div className="w-full h-full flex-[2] flex flex-col fade-left">
              <div className="flex items-center gap-2">
                <Banknote className="size-4 text-gray-700" />
                <span className="w-1/2 text-gray-500 font-heading text-sm">
                  Pagamentos Totais
                </span>
              </div>
              <div className="w-full h-full flex items-end justify-end fade-right">
                <h2
                  className={`text-4xl font-heading font-semibold ${
                    10 > 0 ? "text-primary-300" : "text-red-400"
                  }`}
                >
                  ${formatCurrency(totalAmountReceived)}
                </h2>
              </div>
            </div>

            <div className="w-24 m-auto h-[2px] bg-gray-900" />
            <div className="w-full h-full flex-1 flex flex-col">
              <div className="flex items-center gap-2">
                <BarChart2 className="size-4 text-gray-700" />
                <span className="w-1/2 text-gray-500 font-heading text-sm">
                  Média semanal
                </span>
              </div>
              <div className="w-full h-full flex items-end justify-end fade-right">
                <h2
                  className={`text-xl font-heading font-semibold text-gray-200`}
                >
                  ${formatCurrency(100000)}
                </h2>
              </div>
            </div>

            <div className="w-24 m-auto h-[2px] bg-gray-900" />
            <div className="w-full h-full flex-1 flex flex-col">
              <div className="flex items-center gap-2">
                <Goal className="size-4 text-gray-700" />

                <span className="w-1/2 text-gray-500 font-heading text-sm">
                  Meta semanal
                </span>
              </div>
              <div className="w-full h-full flex items-end justify-end fade-right">
                <h2
                  className={`text-xl font-heading font-semibold text-gray-200`}
                >
                  ${formatCurrency(50000)}
                </h2>
              </div>
            </div>

            <div className="w-24 m-auto h-[2px] bg-gray-900" />
            <div className="w-full h-full flex-1 flex flex-col">
              <div className="flex items-center gap-2">
                <Diff className="size-4 text-gray-700" />
                <span className="w-1/2 text-gray-500 font-heading text-sm">
                  Diferença
                </span>
              </div>
              <div className="w-full h-full flex items-end justify-end fade-right">
                <h2
                  className={`text-xl font-heading font-semibold text-gray-200`}
                >
                  ${formatCurrency(50000)}
                </h2>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full inset-0 text-gray-500 font-heading flex items-center justify-center gap-2 fade-left">
          <Search className="size-4" />
          <span>Busque por um cliente </span>
        </div>
      )}
    </div>
  );
};

export default GoalsDetails;
