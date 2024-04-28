import { useContext, useEffect, useState } from "react";
import ScreenContainer from "../../components/shared/screenContainer";
import ShootingReceivers from "../../components/shootingReceivers";
import { shootingContext } from "../../contexts/shootingContext";
import ContactType from "../../types/contactType";
import GroupType from "../../types/groupType";
import ShootingBody from "../../components/shootingBody";
import ShootingSummary from "../../components/shootingSummary";

const Shooting = () => {
  const { updateData } = useContext(shootingContext);

  const [selectContacts, setSelectContacts] = useState<ContactType[]>([]);
  const [selectGroups, setSelectGroups] = useState<GroupType[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const loadData = async () => {
      await updateData();
    };
    loadData();
  }, []);

  return (
    <ScreenContainer>
      <ShootingReceivers
        setSelectContacts={setSelectContacts}
        selectContacts={selectContacts}
        setSelectGroups={setSelectGroups}
        selectGroups={selectGroups}
      />
      <ShootingBody text={text} setText={setText} />
      <ShootingSummary
        selectContacts={selectContacts}
        selectGroups={selectGroups}
        text={text}
      />
    </ScreenContainer>
  );
};

export default Shooting;
