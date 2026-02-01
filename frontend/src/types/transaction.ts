export type TransactionType = "IN" | "OUT";

export interface Transaction {
  id: string;
  category: string;
  accountType: string;
  date: string; // YYYY-MM-DD
  amount: number;
  type: TransactionType;
}
