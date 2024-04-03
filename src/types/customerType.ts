import ContactType from "./contactType";
import GroupType from "./groupType";

type CustomerType = {
  id?: number;
  sigaId: number;
  name: string;
  balance: number;
  group?: GroupType;
  contact?: ContactType;
};

export default CustomerType;
