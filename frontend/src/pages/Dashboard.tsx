import Layout from "../components/layout/Layout";
import DashboardLayout from "../components/layout/DashboardLayout";
import AnalysisDashboard from "../components/dashboard/analysis/AnalysisDashboard.tsx";
import StatisticsDashboard from "../components/dashboard/statics/StatisticsDashboard";
import { transactions } from "../data/transactions";

const Dashboard = () => {
  return (
    <Layout>
      <DashboardLayout
        left={<StatisticsDashboard transactions={transactions} />}
        right={<AnalysisDashboard />}
      />
    </Layout>
  );
};

export default Dashboard;
