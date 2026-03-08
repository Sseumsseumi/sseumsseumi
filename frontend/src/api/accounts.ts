import axiosClient from "./axiosClient";

export interface Account {
  accountId: number;
  accountBankName: string;
  accountName: string;
  accountNumber: string;
  accountCreatedAt: string;
  accountBalance: number;
}

export const getAccounts = () => {
  return axiosClient.get("/accounts");
};