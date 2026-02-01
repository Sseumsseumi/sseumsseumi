import Layout from "../components/layout/Layout";
import DashboardLayout from "../components/layout/DashboardLayout";
import LeftDashboard from "../components/dashboard/analysis/LeftDashboard";
import RecentTransactions from "../components/transactions/RecentTransactions";
import { transactions } from "../data/transactions";

const Dashboard = () => {
  return (
    <Layout>
      <DashboardLayout
        left={<LeftDashboard />}
        right={<RecentTransactions transactions={transactions} />}
      />
    </Layout>
  );
};

export default Dashboard;
