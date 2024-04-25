import ContactType from "./contactType";
import GroupType from "./groupType";

type OrderType = {
  id: number;
  customerId: number;
  customer: string;
  total: number;
  wasSent: string;
  status: number | null;
  contact: ContactType | null;
  group: GroupType | null;
};

export default OrderType;
