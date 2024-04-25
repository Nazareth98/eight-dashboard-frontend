import { useContext, useEffect, useState } from "react";
import ScreenContainer from "../../components/shared/screenContainer";
import ShootingReceivers from "../../components/shootingReceivers";
import { shootingContext } from "../../contexts/shootingContext";
import ContactType from "../../types/contactType";
import GroupType from "../../types/groupType";

const Shooting = () => {
  const { updateData } = useContext(shootingContext);

  const [selectContacts, setSelectContacts] = useState<ContactType[]>([]);
  const [selectGroups, setSelectGroups] = useState<GroupType[]>([]);

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
    </ScreenContainer>
  );
};

export default Shooting;
