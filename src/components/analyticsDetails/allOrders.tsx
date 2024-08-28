import { Suspense, useContext, useEffect, useState } from "react";
import ComponentContainer from "../shared/componentContainer";
import CustomSubtitle from "../shared/customSubtitle";
import { analyticsContext } from "../../contexts/analyticsContext";
import Loading from "../shared/loading";
import { formatCurrency, sortTableData } from "../../utils/generalsUtils";
import { File, FileArchive } from "lucide-react";

const AllOrders = () => {
  const { customerDetails } = useContext(analyticsContext);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [tableData, setTableData] = useState<any[]>();

  useEffect(() => {
    if (customerDetails) {
      setTableData(customerDetails);
    }
  }, [customerDetails]);

  useEffect(() => {
    if (sortBy) {
      const sortedOrders = sortTableData(
        [...customerDetails],
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
    <ComponentContainer classToAdd="row-span-12 col-span-4">
      <CustomSubtitle subtitle="Todos os pedidos" />
      <div className="w-full h-full flex-1  flex items-center gap-2 fade-left">
        <FileArchive className="size-5 text-gray-600" />
        <h2 className="text-xl text-gray-300 font-heading font-semibold ">
          {customerDetails?.length} notas
        </h2>
      </div>
      <Suspense fallback={<Loading />}>
        <div className="w-full h-full overflow-y-auto flex flex-col gap-2 fade-left">
          <table>
            <thead>
              <tr>
                <th
                  onClick={() => handleSort("doc")}
                  className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300"
                >
                  Doc
                </th>
                <th
                  onClick={() => handleSort("date")}
                  className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300"
                >
                  Data
                </th>
                <th
                  onClick={() => handleSort("amountPaid")}
                  className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300"
                >
                  Valor
                </th>
                <th
                  onClick={() => handleSort("profit")}
                  className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300"
                >
                  Lucro
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData?.map((order) => (
                <tr key={order.doc} className="border border-gray-800">
                  <td className="px-4 py-2 text-sm text-gray-100 text-center">
                    {order.doc}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-100 text-center">
                    {new Date(order.date).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-100 text-center">
                    ${formatCurrency(order.amountPaid)}
                  </td>
                  <td
                    className={`px-4 py-2 text-sm text-center ${
                      order.profit > 0
                        ? "text-primary-500"
                        : order.profit < 0
                        ? "text-red-500"
                        : "text-gray-600"
                    }`}
                  >
                    ${formatCurrency(order.profit)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Suspense>
    </ComponentContainer>
  );
};

export default AllOrders;
