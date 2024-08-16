import {
  Award,
  Banknote,
  Diff,
  File,
  FileArchive,
  FileBadge,
  FileText,
  Goal,
  GoalIcon,
  HandCoins,
  MousePointerClick,
} from "lucide-react";
import ComponentContainer from "../shared/componentContainer";
import { useContext, useEffect, useState } from "react";
import { formatCurrency } from "../../utils/generalsUtils";
import CustomSubtitle from "../shared/customSubtitle";
import { goalsContext } from "../../contexts/goalsContext";

interface RatingType {
  percentage: number;
  amount: number;
}

interface ChargesResumeType {
  totalBalance: number;
  totalPayments: number;
  totalDiff: number;
  amountWithGoals: number;
  ratingA: RatingType;
  ratingB: RatingType;
  ratingC: RatingType;
}

const GoalsResume = () => {
  const { charges } = useContext(goalsContext);

  const [chargesResume, setChargesResume] = useState<ChargesResumeType>({
    totalBalance: 0,
    totalPayments: 0,
    totalDiff: 0,
    amountWithGoals: 0,
    ratingA: { percentage: 0, amount: 0 },
    ratingB: { percentage: 0, amount: 0 },
    ratingC: { percentage: 0, amount: 0 },
  });

  useEffect(() => {
    async function loadData() {
      try {
        let balance = 0;
        let payments = 0;
        let diff = 0;
        let withGoals = 0;
        let ratingA = { percentage: 0, amount: 0 };
        let ratingB = { percentage: 0, amount: 0 };
        let ratingC = { percentage: 0, amount: 0 };

        for (let i = 0; i < charges.length; i++) {
          const charge = charges[i];
          balance += charge.balance;
          payments += charge.payment;

          if (charge.goal > 0) {
            withGoals += 1;
          }

          if (charge.goal) {
            const percentage = charge.percentageOfTarget;
            if (percentage < 33) {
              ratingC.amount += 1;
            } else if (percentage >= 33 && percentage < 66) {
              ratingB.amount += 1;
            } else if (percentage >= 66 && percentage <= 100) {
              ratingA.amount += 1;
            }
          }
        }

        diff = balance + payments;

        setChargesResume({
          totalBalance: balance,
          totalPayments: payments,
          totalDiff: diff,
          amountWithGoals: withGoals,
          ratingA: {
            percentage: (ratingA.amount / withGoals) * 100,
            amount: ratingA.amount,
          },
          ratingB: {
            percentage: (ratingB.amount / withGoals) * 100,
            amount: ratingB.amount,
          },
          ratingC: {
            percentage: (ratingC.amount / withGoals) * 100,
            amount: ratingC.amount,
          },
        });
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }
    if (charges) {
      loadData();
    }
  }, [charges]);

  return (
    <ComponentContainer classToAdd="row-span-12 col-span-3">
      <CustomSubtitle
        subtitle="Resumo"
        icon={<FileText className="size-6" />}
      />

      <div className="w-full h-full flex flex-col items-start gap-4">
        <div className="w-full h-full flex-[2] flex flex-col fade-left">
          <div className="flex items-center gap-2">
            <Banknote className="size-4 text-gray-700" />
            <span className="w-1/2 text-gray-500 font-heading text-sm">
              Saldo Total
            </span>
          </div>
          <div className="w-full h-full flex items-end justify-end fade-right">
            <h2
              className={`text-4xl font-heading font-semibold ${
                chargesResume.totalBalance > 0
                  ? "text-primary-500"
                  : chargesResume.totalBalance < 0
                  ? "text-red-500"
                  : "text-gray-600"
              }`}
            >
              ${formatCurrency(chargesResume.totalBalance)}
            </h2>
          </div>
        </div>

        <div className="w-24 m-auto h-[2px] bg-gray-900" />
        <div className="w-full h-full flex-1 flex flex-col">
          <div className="flex items-center gap-2">
            <HandCoins className="size-4 text-gray-700" />
            <span className="w-1/2 text-gray-500 font-heading text-sm">
              Pagamentos Totais
            </span>
          </div>
          <div className="w-full h-full flex items-end justify-end fade-right">
            <h2 className="text-xl font-heading font-semibold text-gray-200">
              ${formatCurrency(chargesResume.totalPayments)}
            </h2>
          </div>
        </div>

        <div className="w-24 m-auto h-[2px] bg-gray-900" />
        <div className="w-full h-full flex-1 flex flex-col">
          <div className="flex items-center gap-2">
            <Diff className="size-4 text-gray-700" />
            <span className="w-1/2 text-gray-500 font-heading text-sm">
              Restante
            </span>
          </div>
          <div className="w-full h-full flex items-end justify-end fade-right">
            <h2 className="text-xl font-heading font-semibold text-gray-200">
              ${formatCurrency(chargesResume.totalDiff)}
            </h2>
          </div>
        </div>

        <div className="w-24 m-auto h-[2px] bg-gray-900" />
        <div className="w-full h-full flex-1 flex flex-col">
          <div className="flex items-center gap-2">
            <Goal className="size-4 text-gray-700" />
            <span className="w-1/2 text-gray-500 font-heading text-sm">
              Clientes com metas
            </span>
          </div>
          <div className="w-full h-full flex items-end justify-end fade-right">
            <h2 className="text-xl font-heading font-semibold text-gray-200">
              {chargesResume.amountWithGoals}
            </h2>
          </div>
        </div>

        <div className="w-24 m-auto h-[2px] bg-gray-900" />
        <div className="w-full h-full flex-1 flex flex-col">
          <div className="flex items-center gap-2">
            <Award className="size-4 text-primary-400" />
            <span className="w-1/2 text-gray-500 font-heading text-sm">
              Nota A
            </span>
          </div>
          <div className="w-full h-full flex items-end justify-end text-primary-400 font-heading fade-right ">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold">
                {chargesResume.ratingA.percentage.toFixed()}%
              </h2>
              <span className="text-xs">({chargesResume.ratingA.amount})</span>
            </div>
          </div>
        </div>

        <div className="w-24 m-auto h-[2px] bg-gray-900" />
        <div className="w-full h-full flex-1 flex flex-col">
          <div className="flex items-center gap-2">
            <Award className="size-4 text-yellow-400" />
            <span className="w-1/2 text-gray-500 font-heading text-sm">
              Nota B
            </span>
          </div>
          <div className="w-full h-full flex items-end justify-end text-yellow-400 font-heading fade-right ">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold">
                {chargesResume.ratingB.percentage.toFixed()}%
              </h2>
              <span className="text-xs">({chargesResume.ratingB.amount})</span>
            </div>
          </div>
        </div>

        <div className="w-24 m-auto h-[2px] bg-gray-900" />
        <div className="w-full h-full flex-1 flex flex-col">
          <div className="flex items-center gap-2">
            <Award className="size-4 text-red-700" />
            <span className="w-1/2 text-gray-500 font-heading text-sm">
              Nota C
            </span>
          </div>
          <div className="w-full h-full flex items-end justify-end text-red-600 font-heading fade-right ">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold">
                {chargesResume.ratingC.percentage.toFixed()}%
              </h2>
              <span className="text-xs">({chargesResume.ratingC.amount})</span>
            </div>
          </div>
        </div>
      </div>
    </ComponentContainer>
  );
};

export default GoalsResume;
