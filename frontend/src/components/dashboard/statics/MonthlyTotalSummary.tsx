import { useEffect, useState } from "react";
import MonthlyExpenseBarChart from "../chart/MonthlyExpenseBarChart";
import {
  getMonthlyStatistics,
  type MonthlyStatistics,
} from "../../../api/statistics";

const getLast4MonthsRange = () => {
  const now = new Date();

  const endDate = now.toISOString().slice(0, 10);

  const start = new Date();
  start.setMonth(now.getMonth() - 3);
  start.setDate(1);

  const startDate = start.toISOString().slice(0, 10);

  return { startDate, endDate };
};

const MonthlyTotalSummary = () => {
  const [stats, setStats] = useState<MonthlyStatistics[]>([{
            "month": "2025-11",
            "totalIncome": 12719578,
            "totalExpenditure": 1806840
        },
        {
            "month": "2025-12",
            "totalIncome": 12826538,
            "totalExpenditure": 2488318
        },
        {
            "month": "2026-01",
            "totalIncome": 11771336,
            "totalExpenditure": 1761112
        },
        {
            "month": "2026-02",
            "totalIncome": 10422794,
            "totalExpenditure": 2033946
        },
        {
            "month": "2026-03",
            "totalIncome": 5778369,
            "totalExpenditure": 1260643
        }]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { startDate, endDate } = getLast4MonthsRange();

        const data = await getMonthlyStatistics(
          startDate,
          endDate
        );

        // 최근 4개월만
        setStats(data.slice(-4));
      } catch (e) {
        console.error("월별 통계 조회 실패", e);
      }
    };

    fetchStats();
  }, []);

  if (!stats.length) return null;

  const current = stats[stats.length - 1];
  const prev = stats[stats.length - 2];

  const diff =
    (current?.totalExpenditure ?? 0) -
    (prev?.totalExpenditure ?? 0);

  const isIncrease = diff > 0;

  const avgExpense =
    stats.reduce(
      (sum, s) => sum + s.totalExpenditure,
      0
    ) / stats.length;

  return (
    <section
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <h3>월별 소비 통계</h3>

      <p style={{ fontSize: 22, fontWeight: "bold" }}>
        이번 달 지출{" "}
        {current.totalExpenditure.toLocaleString()}원
      </p>

      <p style={{ color: "#6b7280" }}>
        전월 대비{" "}
        <strong
          style={{
            color: isIncrease ? "#ef4444" : "#22c55e",
          }}
        >
          {isIncrease ? "+" : "-"}
          {Math.abs(diff).toLocaleString()}원
        </strong>
      </p>

      <p style={{ marginTop: 6 }}>
        최근 4개월 평균 지출:{" "}
        {Math.round(avgExpense).toLocaleString()}원
      </p>

      <MonthlyExpenseBarChart data={stats} />
    </section>
  );
};

export default MonthlyTotalSummary;