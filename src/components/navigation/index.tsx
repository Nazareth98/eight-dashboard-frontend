import { useContext, useState } from "react";

import IconDispatches from "../../assets/svg/iconDispatches";
import IconLogout from "../../assets/svg/iconLogout";
import IconSettings from "../../assets/svg/iconSettings";
import IconOverview from "../../assets/svg/iconOverview.js";
import IconPayments from "../../assets/svg/iconPayments.js";
import IconMonitoring from "../../assets/svg/iconMonitoring.js";
import IconSaving from "../../assets/svg/iconSaving.js";
import IconExchange from "../../assets/svg/iconExchange.js";
import IconChat from "../../assets/svg/iconChat.js";
import IconGroups from "../../assets/svg/iconGroups.js";
import IconOrders from "../../assets/svg/iconOrders.js";
import IconPhone from "../../assets/svg/iconPhone.js";

import Overview from "../../screens/overview";
import Settings from "../../screens/settings";
import BillsToPay from "../../screens/billsToPay/index.js";
import BillsToReceive from "../../screens/billsToReceive/index.js";
import Analytics from "../../screens/analytics/index.js";
import Exchangers from "../../screens/exchangers/index.js";
import Stock from "../../screens/stock/index.js";
import Shooting from "../../screens/shooting/index.js";
import Customers from "../../screens/customers/index.js";
import Orders from "../../screens/orders/index.js";
import Chatbot from "../../screens/chatbot/index.js";

import Header from "../header";
import CustomButton from "../shared/customButton";
import fullLogo from "../../assets/images/full_logo.png";
import { authContext } from "../../contexts/authContext";
import { chatbotContext } from "../../contexts/chatbotContext.js";

interface OptionType {
  id: number;
  name?: string;
  description?: string;
  icon?: JSX.Element;
  content?: JSX.Element;
}

const Navigation = () => {
  const { user } = useContext(authContext);

  const [selectedSection, setSelectedSection] = useState<OptionType>({
    id: 10,
  });

  const { signOut } = useContext(authContext);

  let navOptions = [
    {
      id: 1,
      name: "Visão Geral",
      description: "Visão geral",
      icon: (
        <IconOverview
          width="24px"
          fill={selectedSection.id === 1 ? "fill-primary-400" : "fill-gray-400"}
        />
      ),
      content: <Overview />,
    },
    {
      id: 10,
      name: "Chatbot",
      icon: (
        <IconPhone
          width="24px"
          fill={
            selectedSection.id === 10 ? "fill-primary-400" : "fill-gray-400"
          }
        />
      ),
      content: <Chatbot />,
    },
    {
      id: 2,
      name: "Contas a pagar",
      icon: (
        <IconPayments
          width="24px"
          fill={selectedSection.id === 2 ? "fill-primary-400" : "fill-gray-400"}
        />
      ),
      content: <BillsToPay />,
    },
    // {
    //   id: 3,
    //   name: "Contas à receber",
    //   icon: (
    //     <IconSaving
    //       width="24px"
    //       fill={selectedSection.id === 3 ? "fill-primary-400" : "fill-gray-400"}
    //     />
    //   ),
    //   content: <BillsToReceive />,
    // },
    {
      id: 4,
      name: "Analytics",
      icon: (
        <IconMonitoring
          width="24px"
          fill={selectedSection.id === 4 ? "fill-primary-400" : "fill-gray-400"}
        />
      ),
      content: <Analytics />,
    },
    // {
    //   id: 5,
    //   name: "Cambistas",
    //   icon: (
    //     <IconExchange
    //       width="24px"
    //       fill={selectedSection.id === 5 ? "fill-primary-400" : "fill-gray-400"}
    //     />
    //   ),
    //   content: <Exchangers />,
    // },
    {
      id: 6,
      name: "Estoque",
      icon: (
        <IconDispatches
          width="24px"
          fill={selectedSection.id === 6 ? "fill-primary-400" : "fill-gray-400"}
        />
      ),
      content: <Stock />,
    },
    {
      id: 7,
      name: "Disparo em massa",
      icon: (
        <IconChat
          width="24px"
          fill={selectedSection.id === 7 ? "fill-primary-400" : "fill-gray-400"}
        />
      ),
      content: <Shooting />,
    },
    {
      id: 8,
      name: "Clientes",
      icon: (
        <IconGroups
          width="24px"
          fill={selectedSection.id === 8 ? "fill-primary-400" : "fill-gray-400"}
        />
      ),
      content: <Customers />,
    },
    {
      id: 9,
      name: "Pedidos",
      icon: (
        <IconOrders
          width="24px"
          fill={selectedSection.id === 9 ? "fill-primary-400" : "fill-gray-400"}
        />
      ),
      content: <Orders />,
    },

    {
      id: 11,
      name: "Configurações",
      icon: (
        <IconSettings
          width="24px"
          fill={
            selectedSection.id === 11 ? "fill-primary-400" : "fill-gray-400"
          }
        />
      ),
      content: <Settings />,
    },
  ];

  const handleSelectSection = ({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(currentTarget.id);
    const selected = navOptions.filter((option) => option.id === id);
    setSelectedSection(selected[0]);
  };

  if (user.accessLevel != 3) {
    navOptions = navOptions.filter((option) => option.name !== "Visão Geral");
    navOptions = navOptions.filter((option) => option.name !== "Configurações");
  }

  return (
    <div className="w-full">
      <div className="bg-gray-900 w-[320px] h-full p-12 flex flex-col gap-8 items-center fixed left-0 top-0">
        <div>
          <img src={fullLogo} alt="Logo Principal" />
        </div>
        <ul className="w-full flex flex-col gap-1">
          {navOptions.map((item) => (
            <li
              id={item.id.toString()}
              key={item.id}
              className={`py-3 px-4 flex items-center gap-2 font-semibold rounded cursor-pointer transition hover:translate-x-2 ${
                selectedSection.id === item.id
                  ? "text-white border-l-4 border-primary-400 translate-x-8 hover:translate-x-8"
                  : "text-gray-400 border-l-2 border-gray-900 hover:bg-gray-950"
              }`}
              onClick={handleSelectSection}
            >
              <div>{item.icon}</div>
              {item.name}
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          <CustomButton type="danger" onClick={signOut}>
            <IconLogout width="25px" fill="fill-red-900" />
            SAIR
          </CustomButton>
        </div>
      </div>
      <div className="ml-[320px] container w-full h-full flex bg-gray-950">
        <section className="w-full h-screen flex flex-col">
          <Header
            icon={selectedSection.icon}
            description={selectedSection.name || "Visão geral"}
          />
          {selectedSection.content || <Chatbot />}
        </section>
      </div>
    </div>
  );
};

export default Navigation;
