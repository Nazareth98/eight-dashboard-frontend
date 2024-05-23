import { useContext, useState } from "react";
import IconAdd from "../../assets/svg/iconAdd";
import CustomInput from "../shared/customInput";
import CustomSubtitle from "../shared/customSubtitle";
import IconVisibilityOn from "../../assets/svg/iconVisibilityOn";
import IconVisibilityOff from "../../assets/svg/iconVisibilityOff";
import CheckboxGroup from "../shared/customCheckboxGroup";
import CustomButton from "../shared/customButton";
import ModalWarning from "../shared/modal/modalWarning";
import UserType from "../../types/userType";
import { userContext } from "../../contexts/userContext";
import IconClean from "../../assets/svg/iconClean";

const accessLevelOptions = [1, 2, 3];

const SettingsCreateUser = () => {
  const { createUser } = useContext(userContext);

  const [isVisible, setIsVisible] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalWarning, setModalWarning] = useState("");

  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [accessLevel, setAccessLevel] = useState<number | null>(null);

  const handleLevelChange = (level) => {
    setAccessLevel(level);
  };

  const handleChangeVisibility = () => {
    setIsVisible(!isVisible);
  };

  const cleanFields = () => {
    setName("");
    setLastname("");
    setPassword("");
    setConfirmPassword("");
    setEmail("");
    setPhone("");
    setPosition("");
    handleLevelChange(null);
  };

  const handleCreateUser = async () => {
    try {
      const body: UserType = {
        accessLevel: Number(accessLevel),
        confirmPassword,
        email,
        lastname,
        name,
        password,
        phone,
        position,
        status: 1,
      };
      const result = await createUser(body);

      if (result.status !== 200) {
        setModalWarning(result.message);
        setModalIsOpen(true);
      } else {
        cleanFields();
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[52rem] col-span-4 row-span-12 bg-gray-900 p-6 rounded-xl border-2 border-gray-800 flex flex-col gap-4">
      <ModalWarning
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        message={modalWarning}
      />
      <CustomSubtitle
        icon={<IconAdd fill="fill-primary-400" width="25px" />}
        subtitle="Criar Novo Usuário"
      />
      <form className="w-full flex flex-col gap-4">
        <CustomInput
          colSpan="2"
          placeholder="João"
          inputValue={name}
          setValue={setName}
          label="Nome:"
        />
        <CustomInput
          colSpan="2"
          placeholder="da Silva"
          inputValue={lastname}
          setValue={setLastname}
          label="Sobrenome:"
        />
        <CustomInput
          colSpan="2"
          type={isVisible ? "text" : "password"}
          label="Senha:"
          placeholder="********"
          inputValue={password}
          setValue={setPassword}
          icon={
            isVisible ? (
              <IconVisibilityOn
                width="25px"
                fill="cursor-pointer transition fill-gray-600 hover:fill-gray-500"
                onClick={handleChangeVisibility}
              />
            ) : (
              <IconVisibilityOff
                width="25px"
                fill="cursor-pointer transition fill-gray-600 hover:fill-gray-500"
                onClick={handleChangeVisibility}
              />
            )
          }
        />
        <CustomInput
          colSpan="2"
          type={isVisible ? "text" : "password"}
          label="Confirmar senha:"
          placeholder="********"
          inputValue={confirmPassword}
          setValue={setConfirmPassword}
          icon={
            isVisible ? (
              <IconVisibilityOn
                width="25px"
                fill="cursor-pointer transition fill-gray-600 hover:fill-gray-500"
                onClick={handleChangeVisibility}
              />
            ) : (
              <IconVisibilityOff
                width="25px"
                fill="cursor-pointer transition fill-gray-600 hover:fill-gray-500"
                onClick={handleChangeVisibility}
              />
            )
          }
        />
        <CustomInput
          colSpan="2"
          placeholder="joao@eight.com"
          inputValue={email}
          setValue={setEmail}
          label="Email:"
        />
        <CustomInput
          colSpan="2"
          placeholder="(45) 99999-0000"
          inputValue={phone}
          setValue={setPhone}
          label="Telefone:"
        />
        <CustomInput
          colSpan="2"
          placeholder="Analista"
          inputValue={position}
          setValue={setPosition}
          label="Cargo:"
        />
        <CheckboxGroup
          colSpan="2"
          label="Nível de acesso:"
          options={accessLevelOptions}
          onChange={handleLevelChange}
        />
      </form>
      <div className="h-full w-full flex items-end justify-end gap-4">
        <CustomButton type="attention" onClick={cleanFields}>
          <IconClean fill="fill-yellow-600" width="25px" />
          Limpar
        </CustomButton>
        <CustomButton onClick={handleCreateUser}>
          <IconAdd fill="fill-primary-700" width="25px" />
          Adicionar
        </CustomButton>
      </div>
    </div>
  );
};

export default SettingsCreateUser;
