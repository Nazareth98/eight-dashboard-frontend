import React, { useState } from "react";
import { PaymentType } from "../../types/paymentType";
import { DockIcon, Printer, Receipt, Search } from "lucide-react";
import { formatCurrency } from "../../utils/generalsUtils";
import CustomSubtitle from "../shared/customSubtitle";

interface GoalsReceiptProps {
  data: PaymentType[];
}

const GoalsReceipt = ({ data }: GoalsReceiptProps) => {
  return (
    <div className="col-span-9 row-span-6 p-6 rounded-xl border-2 border-gray-900 flex flex-col gap-4 fade-left">
      {!data ? (
        <div className="w-full h-full inset-0 text-gray-500 font-heading flex items-center justify-center gap-2 fade-left">
          <Search className="size-4" />
          <span>Busque por um cliente </span>
        </div>
      ) : (
        <>
          <CustomSubtitle
            icon={<Receipt className="size-6 text-gray-600" />}
            subtitle="Recibos"
          />
          <div className="w-full h-full overflow-y-auto flex flex-col gap-2 fade-left">
            <table>
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300">
                    Nota
                  </th>
                  <th className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300">
                    Cliente
                  </th>
                  <th className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300">
                    Data Pagto.
                  </th>
                  <th className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300">
                    Vencimento
                  </th>
                  <th className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300">
                    Valor ($)
                  </th>
                  <th className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300">
                    Recibo
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((payment) => (
                  <tr
                    key={payment.customerId}
                    className="border border-gray-800"
                  >
                    <td className="px-4 py-2 text-sm text-gray-100 text-center">
                      {payment.note}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-100 text-center">
                      {payment.customerName}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-100 text-center">
                      {payment.payDay}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-100 text-center">
                      {payment.dueDate}
                    </td>
                    <td className="px-4 py-2 text-sm text-primary-400 text-center">
                      ${formatCurrency(payment.value)}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-100 text-center flex items-center justify-center gap-2">
                      {payment.receipt}
                      <Printer className="size-4 text-gray-600 cursor-pointer transition-all hover:text-gray-300 active:text-gray-500" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default GoalsReceipt;
