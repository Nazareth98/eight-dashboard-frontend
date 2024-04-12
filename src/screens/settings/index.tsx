import ScreenContainer from "../../components/shared/screenContainer";
import SettingsCreateUser from "../../components/settingsCreateUser";
import SettingsUserList from "../../components/settingsUserList";
import { useContext, useEffect } from "react";
import { userContext } from "../../contexts/userContext";

const Settings = () => {
  const { updateData } = useContext(userContext);

  useEffect(() => {
    updateData();
  }, []);

  return (
    <ScreenContainer>
      <SettingsCreateUser />
      <SettingsUserList />
    </ScreenContainer>
  );
};

export default Settings;
