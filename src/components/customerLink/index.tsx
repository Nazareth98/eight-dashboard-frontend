import { useContext, useState, useEffect } from "react";
import Select, { StylesConfig } from "react-select";

import CustomSubtitle from "../shared/customSubtitle";
import IconPhone from "../../assets/svg/iconPhone";
import { customerContext } from "../../contexts/customerContext";
import CardIconInfo from "../shared/cardIconInfo";
import CustomButton from "../shared/customButton";
import ModalCustomerLink from "./modal";
import ModalWarning from "../shared/modal/modalWarning";
import { formatCurrency, getSelectStyles } from "../../utils/generalsUtils";
import {
  Banknote,
  Contact,
  Diff,
  Link,
  Link2,
  MessagesSquare,
  RefreshCw,
  UserCircle,
} from "lucide-react";

const CustomerLink = () => {
  const { customerData, refreshData } = useContext(customerContext);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [activeModalWarning, setActiveModalWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    const updatedOptions = customerData?.map((customer) => {
      customer.value = customer.id;
      customer.label = `#${customer.id} - ${customer.name}`;

      return customer;
    });
    setOptions(updatedOptions);
  }, [customerData]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleLinkContacts = async () => {
    if (!selectedOption) {
      setWarningMessage(
        "É necessário selecionar um cliente para vincular a um grupo."
      );
      setActiveModalWarning(true);
      return;
    }
    setActiveModal(true);
  };

  const handleUpdateData = async () => {
    try {
      setButtonsDisabled(true);
      await refreshData();
      alert("Dados atualizados com sucesso!");
    } catch (error) {
      alert(error.message);
    } finally {
      setButtonsDisabled(false);
    }
  };

  const customStyles: StylesConfig = getSelectStyles();

  return (
    <div className="col-span-3 row-span-12 p-6 rounded-xl border-2 border-gray-900 flex flex-col gap-8 fade-left">
      <ModalCustomerLink
        isOpen={activeModal}
        setIsOpen={setActiveModal}
        data={selectedOption}
      />
      <ModalWarning
        isOpen={activeModalWarning}
        setIsOpen={setActiveModalWarning}
        message={warningMessage}
      />
      <CustomSubtitle
        icon={<Link className="size-6 text-gray-700" />}
        subtitle="Vincular Contato"
      />
      <Select options={options} onChange={handleChange} styles={customStyles} />
      <div className="w-full h-full flex flex-col items-start gap-6">
        <CardIconInfo
          label="Dígito"
          icon={<UserCircle className="size-6" />}
          data={selectedOption?.sigaDigit}
        />
        <CardIconInfo
          label="Saldo do sistema"
          icon={<Banknote className="size-6" />}
          data={
            selectedOption?.balance
              ? `$${formatCurrency(selectedOption?.balance)}`
              : null
          }
        />
        <CardIconInfo
          label="Saldo da Planilha"
          icon={<Banknote className="size-6" />}
          data={
            selectedOption?.sheetsBalance
              ? `$${formatCurrency(selectedOption?.sheetsBalance)}`
              : null
          }
        />

        <CardIconInfo
          label="Diferença"
          icon={<Diff className="size-6" />}
          data={
            selectedOption?.sheetsBalance
              ? `$${formatCurrency(
                  selectedOption?.balance - selectedOption?.sheetsBalance
                )}`
              : null
          }
        />
        <CardIconInfo
          label="Grupo"
          icon={<MessagesSquare className="size-6" />}
          data={selectedOption ? selectedOption.group?.name : null}
          alternate={!selectedOption?.group}
        />
        <CardIconInfo
          label="Contato"
          icon={<Contact className="size-6" />}
          data={selectedOption ? selectedOption.contact?.name : null}
          alternate={!selectedOption?.contact}
        />
      </div>
      <div className="flex gap-4 items-center justify-end">
        <CustomButton
          onClick={handleUpdateData}
          theme="attention"
          disabled={buttonsDisabled}
        >
          <RefreshCw className="size-4" />
          atualizar
        </CustomButton>
        <CustomButton disabled={buttonsDisabled} onClick={handleLinkContacts}>
          <Link className="size-4" />
          vincular
        </CustomButton>
      </div>
    </div>
  );
};

export default CustomerLink;
