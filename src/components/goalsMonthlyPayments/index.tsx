import { useContext, useEffect, useState } from "react";
import Select, { StylesConfig } from "react-select";

import { goalsContext } from "../../contexts/goalsContext";
import CustomerType from "../../types/customerType";
import CustomSubtitle from "../shared/customSubtitle";
import CustomInput from "../shared/customInput";
import CustomButton from "../shared/customButton";
import IconSearch from "../../assets/svg/iconSearch";
import { customerContext } from "../../contexts/customerContext";
import { getSelectStyles } from "../../utils/generalsUtils";
import { Search, SearchCheck } from "lucide-react";

const GoalsMonthlyPayments = ({ setData }) => {
  const { customerData } = useContext(customerContext);
  const { getMonthlyPayments } = useContext(goalsContext);

  const [options, setOptions] = useState<any[]>();
  const [selectCustomer, setSelectCustomer] = useState<CustomerType>();
  const [selectDate, setSelectDate] = useState<string>();

  const customStyles: StylesConfig = getSelectStyles();

  const handleChange = (selectedOption) => {
    setSelectCustomer(selectedOption);
  };

  async function handleGetData() {
    if (!selectCustomer) {
      alert("É necessário selecionar um cliente.");
      return;
    }
    if (!selectDate) {
      alert("É necessário selecionar um mês.");
      return;
    }
    const [year, month] = selectDate.split("-");
    const data = await getMonthlyPayments(selectCustomer.id, month, year);
    setData(data);
  }

  useEffect(() => {
    const updatedOptions = customerData?.map((customer) => {
      customer.value = customer.id;
      customer.label = `#${customer.id} - ${customer.name}`;
      return customer;
    });
    setOptions(updatedOptions);
  }, [customerData]);

  return (
    <div className="col-span-3 row-span-4 p-6 rounded-xl border-2  border-gray-900 flex flex-col gap-4 fade-left">
      <CustomSubtitle
        icon={<Search className="size-6 text-gray-600" />}
        subtitle="Buscar Dados"
      />

      <div className="w-full flex flex-col gap-2">
        <Select
          options={options}
          onChange={handleChange}
          styles={customStyles}
        />

        <CustomInput
          type="month"
          label="Selecione mês e ano:"
          inputValue={selectDate}
          setValue={setSelectDate}
        />
      </div>
      <div className="w-full flex justify-end space-x-2">
        <CustomButton onClick={handleGetData}>
          <SearchCheck className="size-5" />
          buscar
        </CustomButton>
      </div>
    </div>
  );
};

export default GoalsMonthlyPayments;
