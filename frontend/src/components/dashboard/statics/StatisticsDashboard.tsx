import MonthlyTotalSummary from "./MonthlyTotalSummary";
import CategoryStatsSummary from "./CategoryStatsSummary";
import RecentTransactions from "../transactions/RecentTransactions";
import type { Transaction } from "../../../types/transaction";

interface Props {
  transactions: Transaction[];
}

const StatisticsDashboard = ({ transactions }: Props) => {
  return (
    <>
      <MonthlyTotalSummary transactions={transactions} />
      <CategoryStatsSummary transactions={transactions} />
      <RecentTransactions transactions={transactions} />
    </>
  );
};

export default StatisticsDashboard;
