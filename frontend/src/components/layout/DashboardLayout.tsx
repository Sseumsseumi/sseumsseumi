import type { ReactNode } from "react";

interface Props {
  left: ReactNode;
  right: ReactNode;
}

const DashboardLayout = ({ left, right }: Props) => {
  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1.3fr 0.7fr",
        gap: "24px",
        width: "100%",
      }}
    >
      {/* 가운데: StatisticsDashboard */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {left}
      </section>

      {/* 오른쪽: AnalysisDashboard */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {right}
      </section>
    </div>
  );
};

export default DashboardLayout;