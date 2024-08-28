import { useContext, useState } from "react";

import Overview from "../../screens/overview";
import Settings from "../../screens/settings";
import Analytics from "../../screens/analytics/index.js";
import Stock from "../../screens/stock/index.js";
import Customers from "../../screens/customers/index.js";
import Orders from "../../screens/orders/index.js";
import Chatbot from "../../screens/chatbot/index.js";

import Header from "../header";
import CustomButton from "../shared/customButton";
import fullLogo from "../../assets/images/full_logo.png";
import { authContext } from "../../contexts/authContext";
import ExtraBills from "../../screens/monthlyExpenses/index.js";
import Goals from "../../screens/goals/index.js";
import Providers from "../../screens/providers/index.js";
import {
  Archive,
  ArrowLeft,
  BotMessageSquare,
  FileBarChart,
  FilePieChart,
  FileStack,
  Goal,
  HomeIcon,
  LogOut,
  MessageSquareShare,
  PieChart,
  Receipt,
  Settings2,
  Truck,
  Users,
} from "lucide-react";
import ProductAnalysis from "../../screens/productAnalysis/index.js";
import InventoryTurnover from "../../screens/inventoryTurnover/index.js";

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
    id: 1000,
  });

  const { signOut } = useContext(authContext);

  function changeScreen(screenName) {
    const selected = navOptions.filter((option) => option.name === screenName);
    setSelectedSection(selected[0]);
  }

  let navOptions = [
    {
      id: 1,
      name: "Visão Geral",
      description: "Visão geral",
      icon: (
        <HomeIcon
          className={`size-5 ${
            selectedSection.id === 1 ? "text-primary-400" : "text-gray-400"
          }`}
        />
      ),
      content: <Overview changeScreen={changeScreen} />,
    },
    {
      id: 2,
      name: "Chatbot",
      icon: (
        <BotMessageSquare
          className={`size-5 ${
            selectedSection.id === 2 ? "text-primary-400" : "text-gray-400"
          }`}
        />
      ),
      content: <Chatbot />,
    },
    {
      id: 3,
      name: "Gastos Mensais",
      icon: (
        <Receipt
          className={`size-5 ${
            selectedSection.id === 3 ? "text-primary-400" : "text-gray-400"
          }`}
        />
      ),
      content: <ExtraBills />,
    },
    {
      id: 4,
      name: "Análise de Clientes",
      icon: (
        <FileBarChart
          className={`size-5 ${
            selectedSection.id === 4 ? "text-primary-400" : "text-gray-400"
          }`}
        />
      ),
      content: <Analytics />,
    },
    {
      id: 5,
      name: "Análise de Produtos",
      icon: (
        <FilePieChart
          className={`size-5 ${
            selectedSection.id === 5 ? "text-primary-400" : "text-gray-400"
          }`}
        />
      ),
      content: <ProductAnalysis />,
    },
    {
      id: 6,
      name: "Metas",
      icon: (
        <Goal
          className={`size-5 ${
            selectedSection.id === 6 ? "text-primary-400" : "text-gray-400"
          }`}
        />
      ),
      content: <Goals />,
    },
    {
      id: 7,
      name: "Estoque",
      icon: (
        <Archive
          className={`size-5 ${
            selectedSection.id === 7 ? "text-primary-400" : "text-gray-400"
          }`}
        />
      ),
      content: <Stock />,
    },
    {
      id: 8,
      name: "Clientes",
      icon: (
        <Users
          className={`size-5 ${
            selectedSection.id === 8 ? "text-primary-400" : "text-gray-400"
          }`}
        />
      ),
      content: <Customers />,
    },
    {
      id: 9,
      name: "Provedores",
      icon: (
        <Truck
          className={`size-5 ${
            selectedSection.id === 9 ? "text-primary-400" : "text-gray-400"
          }`}
        />
      ),
      content: <Providers />,
    },
    {
      id: 10,
      name: "Pedidos",
      icon: (
        <FileStack
          className={`size-5 ${
            selectedSection.id === 10 ? "text-primary-400" : "text-gray-400"
          }`}
        />
      ),
      content: <Orders />,
    },
    {
      id: 11,
      name: "Giro de Estoque",
      icon: (
        <PieChart
          className={`size-5 ${
            selectedSection.id === 11 ? "text-primary-400" : "text-gray-400"
          }`}
        />
      ),
      content: <InventoryTurnover />,
    },
    {
      id: 12,
      name: "Configurações",
      icon: (
        <Settings2
          className={`size-5 ${
            selectedSection.id === 12 ? "text-primary-400" : "text-gray-400"
          }`}
        />
      ),
      content: <Settings />,
    },
  ];

  const handleSelectSection = ({ currentTarget }) => {
    const id = Number(currentTarget.id);
    const selected = navOptions.filter((option) => option.id === id);
    setSelectedSection(selected[0]);
  };

  switch (user.accessLevel) {
    case 1:
      let hideToLevel1 = [
        "Visão Geral",
        "Configurações",
        "Pedidos",
        "Clientes",
        "Chatbot",
        "Análise de Clientes",
        "Análise de Produtos",
        "Disparo em massa",
      ];
      navOptions = navOptions.filter(
        (option) => !hideToLevel1.includes(option.name)
      );
      break;

    case 2:
      let hideToLevel2 = [
        "Visão Geral",
        "Análise de Produtos",
        "Análise de Clientes",
        "Configurações",
      ];
      navOptions = navOptions.filter(
        (option) => !hideToLevel2.includes(option.name)
      );

      break;

    default:
      break;
  }

  return (
    <div className="w-full">
      <div className="bg-gray-950 border-r-2 border-gray-900 w-[280px] h-full py-12 px-6 flex flex-col gap-8 items-center fixed left-0 top-0">
        <div className="fade-left">
          <img src={fullLogo} alt="Logo Principal" />
        </div>
        <ul className="w-full overflow-y-auto overflow-x-hidden flex flex-col gap-1">
          {navOptions.map((item) => (
            <li
              id={item.id.toString()}
              key={item.id}
              className={`py-3 px-4 flex items-center gap-2 font-semibold rounded cursor-pointer transition hover:translate-x-2 fade-left ${
                selectedSection.id === item.id
                  ? "text-gray-50 border-l-4 border-primary-400 translate-x-8 hover:translate-x-8 bg-gray-900"
                  : "text-gray-400  hover:bg-gray-950"
              }`}
              onClick={handleSelectSection}
            >
              <div>{item.icon}</div>
              {item.name}
            </li>
          ))}
        </ul>
        <div className="mt-auto fade-left">
          <CustomButton theme="danger" onClick={signOut}>
            <LogOut className="size-4" />
            sair
          </CustomButton>
        </div>
      </div>
      <div className="ml-[280px] container w-full h-full flex bg-gray-950">
        <section className="w-full h-screen flex flex-col">
          {selectedSection.id !== 1000 ? (
            <>
              <Header
                icon={selectedSection.icon}
                description={selectedSection.name || "Visão geral"}
              />
            </>
          ) : null}
          {selectedSection.content || (
            <div className="w-full h-full flex items-center justify-center gap-4 fade-left">
              <div className="p-1 border-2 border-gray-700 rounded-lg">
                <ArrowLeft className="size-4 text-gray-500" />
              </div>
              <p className="text-gray-500 text-xl font-medium font-heading">
                Navegue pelo menu
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Navigation;
