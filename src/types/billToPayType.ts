type BillToPayType = {
  id?: number;
  name: string;
  dueDate: string;
  value: number;
  description: string;
  status?: number;
  repetitions?: number;
};

export default BillToPayType;
