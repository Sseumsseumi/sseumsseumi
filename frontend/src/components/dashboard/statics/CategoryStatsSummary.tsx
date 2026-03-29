import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "../../../store/authAtom";
import {
  getCategoryStatistics,
  type CategoryStatistics,
} from "../../../api/statistics";

interface Props {
  year?: number;
  month?: number;
}

const COLORS = ["#F26076", "#FF9760", "#FFD150", "#60A5FA", "#34D399"];

const dummyData: CategoryStatistics[] = [
  {
    categoryId: 3,
    categoryName: "쇼핑",
    totalExpenditure: 1578145,
  },
  {
    categoryId: 4,
    categoryName: "교통",
    totalExpenditure: 1354396,
  },
  {
    categoryId: 8,
    categoryName: "교육",
    totalExpenditure: 1289144,
  },
  {
    categoryId: 9,
    categoryName: "기타",
    totalExpenditure: 1021136,
  },
  {
    categoryId: 6,
    categoryName: "의료",
    totalExpenditure: 1016608,
  },
];

const CategoryStatsSummary = ({ year, month }: Props) => {
  const user = useAtomValue(userAtom);

  const resolvedYear = year ?? new Date().getFullYear();
  const resolvedMonth = month ?? new Date().getMonth() + 1;

  const [data, setData] =
    useState<CategoryStatistics[]>(dummyData);

  const getMonthRange = () => {
    const start = new Date(resolvedYear, resolvedMonth - 1, 1);
    const end = new Date(resolvedYear, resolvedMonth, 0);

    const format = (d: Date) =>
      d.toISOString().slice(0, 10);

    return {
      startDate: format(start),
      endDate: format(end),
    };
  };

  useEffect(() => {
    // 로그인 안했으면 API 호출 X
    if (!user) return;

    const fetchData = async () => {
      try {
        const { startDate, endDate } = getMonthRange();

        const result = await getCategoryStatistics(
          startDate,
          endDate
        );

        setData(result);
      } catch (e) {
        console.error("카테고리 통계 조회 실패", e);
      }
    };

    fetchData();
  }, [resolvedYear, resolvedMonth, user]);

  const entries = [...data].sort(
    (a, b) => b.totalExpenditure - a.totalExpenditure
  );

  const totalAmount = entries.reduce(
    (sum, item) => sum + item.totalExpenditure,
    0
  );

  return (
    <section
      style={{
        position: "relative",
        background: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <h3>{resolvedMonth}월 카테고리별 지출</h3>

      {entries.length === 0 ? (
        <p style={{ color: "#6b7280", marginTop: "12px" }}>
          이번 달 지출 내역이 없습니다.
        </p>
      ) : (
        <div style={{ marginTop: "16px" }}>
          {entries.map((item, index) => {
            const percentage =
              totalAmount === 0
                ? 0
                : (item.totalExpenditure / totalAmount) * 100;

            return (
              <div
                key={item.categoryId}
                style={{ marginBottom: "14px" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "6px",
                    fontSize: "14px",
                  }}
                >
                  <span>{item.categoryName}</span>
                  <span>
                    {item.totalExpenditure.toLocaleString()}원 ·{" "}
                    {percentage.toFixed(1)}%
                  </span>
                </div>

                <div
                  style={{
                    width: "100%",
                    height: "10px",
                    backgroundColor: "#E5E7EB",
                    borderRadius: "6px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${percentage}%`,
                      height: "100%",
                      backgroundColor:
                        COLORS[index % COLORS.length],
                      borderRadius: "6px",
                      transition: "width 0.3s",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 로그인 안했을 때 잠금 */}
      {!user && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontWeight: 600,
            fontSize: "18px",
            backdropFilter: "blur(2px)",
          }}
        >
          🔒 로그인 후 확인할 수 있습니다
        </div>
      )}
    </section>
  );
};

export default CategoryStatsSummary;