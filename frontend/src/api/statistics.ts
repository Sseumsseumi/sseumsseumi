import axiosClient from "./axiosClient";

export interface MonthlyStatistics {
  month: string;
  totalIncome: number;
  totalExpenditure: number;
}

export const getMonthlyStatistics = async (
  startDate: string,
  endDate: string
): Promise<MonthlyStatistics[]> => {
  const res = await axiosClient.get("/statistics/monthly", {
    params: { startDate, endDate },
  });

  return res.data.dataBody;
};