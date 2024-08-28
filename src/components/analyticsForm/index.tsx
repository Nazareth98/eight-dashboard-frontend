import { useContext, useEffect, useState } from "react";
import { BarChart2 } from "lucide-react";
import {
  AbcAnalysisType,
  analyticsContext,
} from "../../contexts/analyticsContext";
import ComponentContainer from "../shared/componentContainer";
import CustomSubtitle from "../shared/customSubtitle";
import { formatCurrency, sortTableData } from "../../utils/generalsUtils";

const AnalyticsForm = () => {
  const { abcAnalysisData } = useContext(analyticsContext);

  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const [tableData, setTableData] = useState<AbcAnalysisType[]>();

  useEffect(() => {
    if (abcAnalysisData) {
      setTableData(abcAnalysisData);
    }
  }, [abcAnalysisData]);

  useEffect(() => {
    if (sortBy) {
      const sortedOrders = sortTableData(
        [...abcAnalysisData],
        sortBy,
        sortOrder
      );
      setTableData(sortedOrders);
    }
  }, [sortBy, sortOrder]);

  function handleSort(columnName: string) {
    if (sortBy === columnName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(columnName);
      setSortOrder("asc");
    }
  }

  return (
    <ComponentContainer cols="6" rows="6">
      <CustomSubtitle
        icon={<BarChart2 className="size-6" />}
        subtitle="Todos os Clientes"
      />
      <div className="w-full h-full overflow-y-auto font-heading flex flex-col gap-2 fade-left">
        <table>
          <thead>
            <tr>
              <th
                onClick={() => handleSort("doc")}
                className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300"
              >
                Cliente
              </th>
              <th
                onClick={() => handleSort("date")}
                className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300"
              >
                Valor
              </th>
              <th
                onClick={() => handleSort("amountPaid")}
                className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300"
              >
                % Individual
              </th>
              <th
                onClick={() => handleSort("profit")}
                className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300"
              >
                Classificação
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData?.map((customer) => (
              <tr key={customer.customerId} className="border border-gray-800">
                <td className="px-4 py-2 text-sm text-gray-100 text-center">
                  {customer.customerName}
                </td>
                <td className="px-4 py-2 text-sm text-gray-100 text-center">
                  ${formatCurrency(customer.abcAnalysis.totalPurchasedValue)}
                </td>
                <td className="px-4 py-2 text-sm text-gray-100 text-center">
                  {customer.abcAnalysis.abcPercentage}%
                </td>
                <td
                  className={`px-4 py-2 text-lg text-center font-semibold  ${
                    customer.abcAnalysis.abcNote === "A"
                      ? "text-primary-400"
                      : customer.abcAnalysis.abcNote === "B"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {customer.abcAnalysis.abcNote}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ComponentContainer>
  );
};

export default AnalyticsForm;
