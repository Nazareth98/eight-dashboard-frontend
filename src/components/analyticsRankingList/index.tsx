import React, { useContext, useState } from "react";
import CustomSubtitle from "../shared/customSubtitle";
import IconOrders from "../../assets/svg/iconOrders";
import { analyticsContext } from "../../contexts/analyticsContext";
import { formatCurrency } from "../../utils/generalsUtils";

function compareValues(a, b, sortBy, sortOrder) {
  if (a === b) {
    return 0;
  }

  if (typeof a === "string" && typeof b === "string") {
    return sortOrder === "asc" ? a.localeCompare(b) : b.localeCompare(a);
  } else if (typeof a === "number" && typeof b === "number") {
    return sortOrder === "asc" ? a - b : b - a;
  } else {
    const valueA = String(a);
    const valueB = String(b);
    return sortOrder === "asc"
      ? valueA.localeCompare(valueB)
      : valueB.localeCompare(valueA);
  }
}

const AnalyticsRankingList = () => {
  const { analyticsData } = useContext(analyticsContext);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (columnName) => {
    if (sortBy === columnName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(columnName);
      setSortOrder("asc");
    }
  };

  const sortedData = analyticsData?.slice().sort((a, b) => {
    if (sortBy) {
      const valueA = a[sortBy];
      const valueB = b[sortBy];
      return compareValues(valueA, valueB, sortBy, sortOrder);
    }
    return 0;
  });

  return (
    <div className="h-[30rem] col-span-6 row-span-1 bg-gray-900 p-6 rounded-xl border-2 border-gray-800 flex flex-col gap-4">
      <CustomSubtitle
        icon={<IconOrders fill="fill-gray-600" width="25px" />}
        subtitle="Ranking Geral"
      />

      {analyticsData && (
        <div className="w-full h-full overflow-y-auto flex flex-col gap-2">
          <table>
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300">
                  Codigo
                </th>
                <th
                  onClick={() => handleSort("customerName")}
                  className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300"
                >
                  Nome
                </th>
                <th
                  onClick={() => handleSort("amountPaid")}
                  className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300"
                >
                  Valor Gasto
                </th>
                <th
                  onClick={() => handleSort("delayAverage")}
                  className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300"
                >
                  Média de atraso
                </th>
                <th
                  onClick={() => handleSort("totalOrders")}
                  className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300"
                >
                  Pedidos
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((customer) => (
                <tr
                  key={customer.customerId}
                  className="border border-gray-700"
                >
                  <td className="px-4 py-2 text-sm text-gray-100 text-center">
                    {customer.customerId}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-100 text-center">
                    {customer.customerName}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-100 text-center">
                    ${formatCurrency(customer.amountPaid)}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-100 text-center">
                    {customer.delayAverage}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-100 text-center">
                    {customer.totalOrders}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AnalyticsRankingList;
