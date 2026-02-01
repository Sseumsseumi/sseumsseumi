import Layout from "../components/layout/Layout";
import DashboardLayout from "../components/layout/DashboardLayout";
import AnalysisSummary from "../components/dashboard/AnalysisSummary";
import RecentTransactions from "../components/transactions/RecentTransactions";
import { transactions } from "../data/transactions";

const Dashboard = () => {
  return (
    <Layout>
      <DashboardLayout
        left={
          <>
            <AnalysisSummary />
          </>
        }
        right={
          <>
            <RecentTransactions transactions={transactions} />
          </>
        }
      />
    </Layout>
  );
};

export default Dashboard;
