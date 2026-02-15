import type { Transaction } from "../types/transaction";

export const getMonthlyCategoryTotals = (
  transactions: Transaction[],
  year: number,
  month: number
): Record<string, number> => {
  return transactions
    .filter((tx) => {
      if (tx.type !== "OUT") return false;

      const date = new Date(tx.date);
      return (
        date.getFullYear() === year &&
        date.getMonth() + 1 === month
      );
    })
    .reduce<Record<string, number>>((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {});
};
