import { useContext, useState, useEffect } from "react";
import Select from "react-select";

import CustomSubtitle from "../shared/customSubtitle";
import IconPhone from "../../assets/svg/iconPhone";
import { customerContext } from "../../contexts/customerContext";
import CardIconInfo from "../shared/cardIconInfo";
import IconUser from "../../assets/svg/iconUser";
import IconPayments from "../../assets/svg/iconPayments";
import CustomButton from "../shared/customButton";
import IconGroups from "../../assets/svg/iconGroups";
import IconContacts from "../../assets/svg/iconContacts";
import IconLink from "../../assets/svg/iconLink";
import IconRefresh from "../../assets/svg/iconRefresh";
import ModalCustomerLink from "./modal";
import ModalWarning from "../shared/modal/modalWarning";

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

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#C2CCC2",
      borderColor: "#494D49",
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
    <div className="h-[20rem] col-span-5 row-span-6 bg-gray-900 p-6 rounded-xl border-2 border-gray-800 flex flex-col gap-4">
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
        icon={<IconPhone fill="fill-primary-400" width="25px" />}
        subtitle="Vincular Contato"
      />
      <Select options={options} onChange={handleChange} styles={customStyles} />
      <div className="w-full h-full flex items-start gap-2">
        <div className="w-1/2 flex flex-col gap-4">
          <CardIconInfo
            label="Dígito"
            icon={<IconUser width="20px" fill="fill-primary-400" />}
            data={selectedOption?.sigaDigit}
          />
          <CardIconInfo
            label="Saldo"
            icon={<IconPayments width="20px" fill="fill-primary-400" />}
            data={
              selectedOption?.balance ? `$${selectedOption?.balance}` : null
            }
          />
        </div>
        <div className="w-1/2 flex flex-col gap-4">
          <CardIconInfo
            label="Grupo"
            icon={
              <IconGroups
                width="20px"
                fill={
                  !selectedOption?.group
                    ? "fill-primary-800"
                    : "fill-primary-400"
                }
              />
            }
            data={selectedOption ? selectedOption.group?.name : null}
            alternate={!selectedOption?.group}
          />
          <CardIconInfo
            label="Contato"
            icon={
              <IconContacts
                width="20px"
                fill={
                  !selectedOption?.contact
                    ? "fill-primary-800"
                    : "fill-primary-400"
                }
              />
            }
            data={selectedOption ? selectedOption.contact?.name : null}
            alternate={!selectedOption?.contact}
          />
        </div>
      </div>
      <div className="flex gap-4 items-center justify-end">
        <CustomButton
          onClick={handleUpdateData}
          type="attention"
          disabled={buttonsDisabled}
        >
          <IconRefresh width="25px" fill="fill-yellow-600" />
          Atualizar dados
        </CustomButton>
        <CustomButton disabled={buttonsDisabled} onClick={handleLinkContacts}>
          <IconLink width="25px" fill="fill-primary-700" />
          Vincular
        </CustomButton>
      </div>
    </div>
  );
};

export default CustomerLink;
