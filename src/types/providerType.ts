export type ProviderType = {
  id: number;
  digit: number;
  name: string;
  companyName?: string;
  phone?: string;
  balance: number;
  sheetsBalance?: number;
  lastPurchase?: string;
  lastPurchaseValue?: number;
  lastPayment?: string;
  lastPaymentValue: number;
  pastDueAmount: number;
  amountExpiring: number;
};
