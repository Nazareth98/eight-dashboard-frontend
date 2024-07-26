import { KeyboardEvent, useContext, useState } from "react";

import fullLogo from "../../assets/images/full_logo.png";
import CustomInput from "../../components/shared/customInput";
import IconVisibilityOff from "../../assets/svg/iconVisibilityOff";
import IconVisibilityOn from "../../assets/svg/iconVisibilityOn";
import IconLogin from "../../assets/svg/iconLogin";
import { authContext } from "../../contexts/authContext";
import ModalWarning from "../../components/shared/modal/modalWarning";
import CustomButton from "../../components/shared/customButton";
import { LogIn } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalWarning, setModalWarning] = useState("");
  const { signIn } = useContext(authContext);

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleChangeVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleLogin = async () => {
    if (!email) {
      setModalWarning("O preencimento do campo Email é obrigatório");
      setModalIsOpen(true);
      return;
    }

    if (!password) {
      setModalWarning("O preencimento do campo Senha é obrigatório");
      setModalIsOpen(true);
      return;
    }

    try {
      const result = await signIn(email, password);
      if (result && result.status !== 200) {
        setModalWarning(result.message);
        setModalIsOpen(true);
      }
    } catch (error) {
      console.error(error);
      setModalWarning(error.response.data.message);
      setModalIsOpen(true);
    }
  };

  return (
    <div className="h-full bg-gray-950 flex items-center justify-center">
      <ModalWarning
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        message={modalWarning}
      />

      <main className="border-2 border-gray-900 w-96 p-10 rounded-lg flex flex-col items-center gap-10 fade-left">
        <div>
          <img className="h-24" src={fullLogo} alt="Logo Metaconfiança" />
        </div>
        <div className="w-full flex items-center gap-2">
          <IconLogin fill="fill-primary-400" />
          <h2 className="font-heading font-semibold text-gray-50 text-3xl">
            Login
          </h2>
        </div>
        <div className="w-full flex flex-col gap-4">
          <CustomInput
            type="text"
            label="Email:"
            placeholder="joaosilva@gmail.com"
            inputValue={email}
            setValue={setEmail}
          />
          <CustomInput
            type={isVisible ? "text" : "password"}
            label="Senha:"
            placeholder="********"
            inputValue={password}
            setValue={setPassword}
            onKeyPress={handleKeyPress}
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
        </div>
        <CustomButton onClick={handleLogin}>
          <LogIn className="size-4" />
          entrar
        </CustomButton>
      </main>
    </div>
  );
};

export default Login;
