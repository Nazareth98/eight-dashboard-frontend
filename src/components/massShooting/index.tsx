import { useState } from "react";
import ComponentContainer from "../shared/componentContainer";
import CustomSubtitle from "../shared/customSubtitle";
import {
  MessageSquareDashed,
  MessageSquareQuote,
  MessageSquareText,
  User,
  Users,
} from "lucide-react";
import GroupType from "../../types/groupType";
import ContactType from "../../types/contactType";
import SelectGroups from "./selectGroups";
import SelectContacts from "./selectContacts";
import WriteMessage from "./writeMessage";

const MassShooting = () => {
  const [selectContacts, setSelectContacts] = useState<ContactType[]>([]);
  const [selectGroups, setSelectGroups] = useState<GroupType[]>([]);

  return (
    <>
      <ComponentContainer classToAdd="row-span-6 col-span-3 row-start-7 col-start-4">
        <CustomSubtitle
          subtitle="Selecione seus grupos"
          icon={<Users className="size-6" />}
        />

        <SelectGroups
          selectGroups={selectGroups}
          setSelectGroups={setSelectGroups}
        />
      </ComponentContainer>
      <ComponentContainer classToAdd="row-span-6 col-span-3 row-start-7 col-start-7">
        <CustomSubtitle
          subtitle="Selecione seus contatos"
          icon={<User className="size-6" />}
        />

        <SelectContacts
          selectContacts={selectContacts}
          setSelectContacts={setSelectContacts}
        />
      </ComponentContainer>
      <ComponentContainer classToAdd="row-span-6 col-span-3 row-start-7 col-start-10">
        <CustomSubtitle
          subtitle="Escreva sua mensagem"
          icon={<MessageSquareText className="size-6" />}
        />

        <WriteMessage
          selectContacts={selectContacts}
          selectGroups={selectGroups}
        />
      </ComponentContainer>
    </>
  );
};

export default MassShooting;
