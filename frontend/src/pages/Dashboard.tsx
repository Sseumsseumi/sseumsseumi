import Layout from "../components/layout/Layout";
import DashboardLayout from "../components/layout/DashboardLayout";
import LeftDashboard from "../components/dashboard/analysis/LeftDashboard";
import StatisticsDashboard from "../components/dashboard/statics/StatisticsDashboard";
import { transactions } from "../data/transactions";

const Dashboard = () => {
  return (
    <Layout>
      <DashboardLayout
        left={<LeftDashboard />}
        right={<StatisticsDashboard transactions={transactions} />}
      />
    </Layout>
  );
};

export default Dashboard;
