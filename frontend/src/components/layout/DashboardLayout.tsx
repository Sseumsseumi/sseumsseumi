import type { ReactNode } from "react";

interface Props {
  left: ReactNode;
  right: ReactNode;
}

const DashboardLayout = ({ left, right }: Props) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr", // 분석 영역을 약간 더 넓게
        gap: "24px",
        height: "100%",
      }}
    >
      {/* 왼쪽: 소비 분석 리포트 */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          overflowY: "auto",
        }}
      >
        {left}
      </section>

      {/* 오른쪽: 거래 요약 / 리스트 */}
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
