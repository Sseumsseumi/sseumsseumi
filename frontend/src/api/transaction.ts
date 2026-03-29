import axiosClient from "./axiosClient";

export interface TransactionResponse {
  transactionId: number;
  transactionDate: string;
  transactionTime: string;
  transactionWithdrawal: number;
  transactionDeposit: number;
  transactionContent: string;
  transactionBranch: string;
  categoryName: string;
}

export const getTransactions = async (
  startDate: string,
  endDate: string
) => {
  const res = await axiosClient.get("/api/v1/transactions", {
    params: {
      startDate,
      endDate,
    },
  });

  return res.data.dataBody as TransactionResponse[];
};