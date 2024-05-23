import { useContext, useEffect, useState } from "react";
import Select from "react-select";

import CustomSubtitle from "../shared/customSubtitle";
import IconReport from "../../assets/svg/iconReport";
import CustomInput from "../shared/customInput";
import CustomButton from "../shared/customButton";
import { customerContext } from "../../contexts/customerContext";
import { analyticsContext } from "../../contexts/analyticsContext";
import {
  formataDate,
  formatCurrency,
  formatOrder,
} from "../../utils/generalsUtils";
import Loading from "../shared/loading";

const AnalyticsForm = () => {
  const { customerData } = useContext(customerContext);
  const { getAnalyticsById } = useContext(analyticsContext);

  const [period, setPeriod] = useState();
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [analyticsData, setAnalyticsData] = useState();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (customerData) {
      const updatedOptions = customerData?.map((customer) => {
        customer.value = customer.id;
        customer.label = `#${customer.id} - ${customer.name}`;

        return customer;
      });
      setOptions(updatedOptions);
    }
  }, [customerData]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  async function generateAnalytics() {
    if (!selectedOption) {
      alert("É necessário selecionar um cliente!");
      return;
    }

    if (!period) {
      alert("É necessário definir um período!");
      return;
    }

    setIsLoading(true);
    const response = await getAnalyticsById(selectedOption.id, Number(period));
    console.log(response);
    if (response.status === 200) {
      setAnalyticsData(response.result);
    } else {
      alert(response.message);
    }
    setIsLoading(false);
    return;
  }

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#C2CCC2",
      borderColor: "#494D49",
      padding: "3px",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "#45C93B" : "#929991",
      backgroundColor: state.isSelected ? "#022300" : "#313330",
      "&:hover": {
        backgroundColor: "#616661",
        color: "#DBE5DA",
      },
    }),
  };

  return (
    <div className="h-[30rem] col-span-6 row-span-1 bg-gray-900 p-6 rounded-xl border-2 border-gray-800 flex flex-col gap-4">
      <CustomSubtitle
        icon={<IconReport fill="fill-gray-600" width="25px" />}
        subtitle="Gerar um Relatório"
      />
      <div className="w-full gap-4 flex ">
        <CustomInput
          colSpan="1"
          label="Período em meses"
          type="number"
          inputValue={period}
          setValue={setPeriod}
          placeholder="3 meses"
        />
        <div className="w-full flex flex-col gap-1 col-span-3">
          <label className="text-gray-200 text-sm font-medium">
            Selecione um cliente:
          </label>
          <Select
            options={options}
            onChange={handleChange}
            styles={customStyles}
          />
        </div>
        <div className="flex items-end justify-center col-span-2">
          <CustomButton onClick={generateAnalytics}>
            <IconReport fill="fill-primary-700" width="25px" />
            Gerar
          </CustomButton>
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="w-full">
            <h3 className="text-gray-100 text-2xl font-heading">
              {analyticsData ? `Em ${analyticsData.period} meses...` : null}
            </h3>
          </div>

          {analyticsData && (
            <>
              <div className="w-full">
                <div
                  className={`bg-gray-950 rounded border-l-4 border-primary-400 grid grid-cols-12 p-2 gap-2 transition-all`}
                >
                  <div className="flex flex-col gap-2 p-2 col-span-3">
                    <span className={`text-gray-500 text-xs font-semibold`}>
                      Valor Gasto
                    </span>
                    <p className="text-gray-100 text-lg">
                      ${formatCurrency(analyticsData.amountPaid)}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 p-2 col-span-3">
                    <span className={`text-gray-500 text-xs font-semibold`}>
                      Valor Médio/Pedido
                    </span>
                    <p className="text-gray-100 text-lg">
                      ${formatCurrency(analyticsData.valueByOrderAverage)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 p-2 col-span-2">
                    <span className={`text-gray-500 text-xs font-semibold`}>
                      Média de atraso
                    </span>
                    <p className="text-yellow-400 text-lg">
                      {analyticsData.delayAverage}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 p-2 col-span-2">
                    <span className={`text-gray-500 text-xs font-semibold`}>
                      Pagos em dia (a cada 10)
                    </span>
                    <p className="text-gray-100 text-lg">
                      {analyticsData.paidOnTimeAverage}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 p-2 col-span-2">
                    <span className={`text-gray-500 text-xs font-semibold`}>
                      Total de Pedidos
                    </span>
                    <p className="text-gray-100 text-lg">
                      {analyticsData.orders.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full h-full overflow-y-auto">
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300">
                        Doc
                      </th>
                      <th className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300">
                        Data
                      </th>
                      <th className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300">
                        Valor
                      </th>
                      <th className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300">
                        Dias de atraso
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.orders.map((order) => (
                      <tr key={order.id} className="border border-gray-700">
                        <td className="px-4 py-2 text-sm text-gray-100 text-center">
                          {formatOrder(order.doc)}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-100 text-center">
                          {formataDate(order.date)}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-100 text-center">
                          ${formatCurrency(order.value)}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-100 text-center">
                          {order.delayedDays}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AnalyticsForm;
