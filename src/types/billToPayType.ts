type BillToPayType = {
  id?: number;
  name: string;
  dueDate: string;
  value: number;
  description: string;
  categoryName: string;
  status?: number;
  repetitions?: number;
};

export default BillToPayType;
