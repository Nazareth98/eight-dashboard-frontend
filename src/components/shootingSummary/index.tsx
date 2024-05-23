import { useContext } from "react";
import IconContacts from "../../assets/svg/iconContacts";
import IconGroups from "../../assets/svg/iconGroups";
import IconReport from "../../assets/svg/iconReport";
import IconShooting from "../../assets/svg/iconShooting";
import CardIconInfo from "../shared/cardIconInfo";
import CustomButton from "../shared/customButton";
import CustomSubtitle from "../shared/customSubtitle";
import { shootingContext } from "../../contexts/shootingContext";

const ShootingSummary = ({ selectContacts, selectGroups, text }) => {
  const { shooting } = useContext(shootingContext);

  async function handleShooting() {
    try {
      if (!text) {
        alert("É necessário escrever uma mensagem.");
        return;
      }

      if (selectContacts.length < 1 && selectGroups.length < 1) {
        alert("É necessário selecionar ao menos 1 destinatário.");
        return;
      }

      const body = {
        text,
        receivers: [...selectContacts, ...selectGroups],
      };
      const result = await shooting(body);

      if (result.status !== 200) {
        alert(result.message);
        return;
      }
      alert(result.message);

      console.log(result);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="h-[25rem] col-span-6 row-span-6 bg-gray-900 p-6 rounded-xl border-2 border-gray-800 flex flex-col gap-4">
      <CustomSubtitle
        icon={<IconReport fill="fill-primary-400" width="25px" />}
        subtitle="Confirme o seu disparo"
      />

      <div className="w-full flex gap-20">
        <CardIconInfo
          label="Contatos selecionados"
          icon={<IconContacts fill="fill-primary-400" />}
          data={`${selectContacts.length}`}
        />
        <CardIconInfo
          label="Grupos selecionados"
          icon={<IconGroups fill="fill-primary-400" />}
          data={`${selectGroups.length}`}
        />
      </div>

      <div className="w-full h-[50rem] overflow-y-auto bg-gray-950 border-2 border-gray-800 p-2">
        <p className="text-gray-400">{text}</p>
      </div>

      <div className="w-full h-full flex items-end justify-end">
        <CustomButton onClick={handleShooting}>
          <IconShooting fill="fill-primary-700" />
          Enviar Mensagem
        </CustomButton>
      </div>
    </div>
  );
};

export default ShootingSummary;
