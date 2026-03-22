import MonthlyTotalSummary from "./MonthlyTotalSummary";
import CategoryStatsSummary from "./CategoryStatsSummary";
import RecentTransactions from "../transactions/RecentTransactions";

const StatisticsDashboard = () => {
  return (
    <>
      <RecentTransactions/>
      <MonthlyTotalSummary/>
      <CategoryStatsSummary />
    </>
  );
};

export default StatisticsDashboard;
