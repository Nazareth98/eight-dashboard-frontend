import { useContext } from "react";
import IconEdit from "../../assets/svg/iconEdit";
import CustomSubtitle from "../shared/customSubtitle";
import CustomTextarea from "../shared/customTextarea";
import { shootingContext } from "../../contexts/shootingContext";

const ShootingBody = ({ text, setText }) => {
  return (
    <div className="col-span-6 row-span-6 p-6 rounded-xl border-2 border-gray-900 flex flex-col gap-4 fade-left">
      <CustomSubtitle
        icon={<IconEdit fill="fill-gray-500" width="25px" />}
        subtitle="Escreva sua mensagem"
      />
      <div>
        <CustomTextarea
          label="Mensagem:"
          placeholder="Bom dia, informamos que..."
          value={text}
          setValue={setText}
          rows={10}
        />
      </div>
    </div>
  );
};

export default ShootingBody;
