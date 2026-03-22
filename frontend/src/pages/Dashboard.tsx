import Layout from "../components/layout/Layout";
import DashboardLayout from "../components/layout/DashboardLayout";
import AnalysisDashboard from "../components/dashboard/analysis/AnalysisDashboard.tsx";
import StatisticsDashboard from "../components/dashboard/statics/StatisticsDashboard";

const Dashboard = () => {
  return (
    <Layout>
      <DashboardLayout
        left={<StatisticsDashboard />}
        right={<AnalysisDashboard />}
      />
    </Layout>
  );
};

export default Dashboard;
