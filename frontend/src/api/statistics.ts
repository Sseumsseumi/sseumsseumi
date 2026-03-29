import axiosClient from "./axiosClient";

export interface MonthlyStatistics {
  month: string;
  totalIncome: number;
  totalExpenditure: number;
}

export interface CategoryStatistics {
  categoryId: number;
  categoryName: string;
  totalExpenditure: number;
}

export const getMonthlyStatistics = async (
  startDate: string,
  endDate: string
): Promise<MonthlyStatistics[]> => {
  const res = await axiosClient.get("/api/v1/statistics/monthly", {
    params: { startDate, endDate },
  });

  return res.data.dataBody;
};

export const getCategoryStatistics = async (
  startDate: string,
  endDate: string
) => {
  const res = await axiosClient.get("/api/v1/statistics/category", {
    params: {
      startDate,
      endDate,
    },
  });

  return res.data.dataBody as CategoryStatistics[];
};