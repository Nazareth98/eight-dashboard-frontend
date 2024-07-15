import ContactType from "./contactType";
import GroupType from "./groupType";

type CustomerType = {
  id?: number;
  name: string;
  balance: number;
  sigaDigit: number;
  sheetsBalance: number;
  group?: GroupType;
  contact?: ContactType;
};

export default CustomerType;
