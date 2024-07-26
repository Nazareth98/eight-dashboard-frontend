import { Edit } from "lucide-react";
import ComponentContainer from "../shared/componentContainer";
import CustomSubtitle from "../shared/customSubtitle";
import CustomTextarea from "../shared/customTextarea";

const ShootingBody = ({ text, setText }) => {
  return (
    <ComponentContainer cols="6" rows="6">
      <CustomSubtitle
        icon={<Edit className="size-6" />}
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
    </ComponentContainer>
  );
};

export default ShootingBody;
