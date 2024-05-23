import { useContext, useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/pt-br";

import IconUser from "../../assets/svg/iconUser";
import { authContext } from "../../contexts/authContext";

interface HeaderType {
  description: string;
  icon: JSX.Element;
}

const Header = (props: HeaderType) => {
  const [date, setDate] = useState("");
  const { user } = useContext(authContext);

  useEffect(() => {
    const updateDate = () => {
      moment.locale("pt-br");

      const currentDate = moment().format("LLL");
      setDate(currentDate);
    };

    updateDate();
    setInterval(() => {
      updateDate();
    }, 60000);
  }, []);

  return (
    <header className="w-full h-16 p-4 grid grid-cols-12">
      <div className="col-span-3 flex items-center gap-2">
        {props.icon}
        <h2 className="text-2xl font-medium text-gray-50">
          {props.description}
        </h2>
      </div>
      <div className="col-span-6 flex gap-2 justify-center items-center">
        <span className="text-gray-100 font-semibold text-sm">{date}</span>
      </div>
      <div className="col-span-3 text-gray-800 text-sm flex gap-2 items-center flex items-center justify-end">
        <IconUser width="30px" fill="fill-primary-400" />
        <div className="flex flex-col">
          <span className="font-lg font-heading font-semibold text-gray-200">{`${user?.name} ${user?.lastname}`}</span>
          <span className="text-gray-500">{user?.position}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
