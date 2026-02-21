import type { Transaction } from "../../../types/transaction";
import { getMonthlyCategoryTotals } from "../../../utils/categoryStats";

interface Props {
  transactions: Transaction[];
  year?: number;
  month?: number;
}

const COLORS = ["#F26076", "#FF9760", "#FFD150"];

const CategoryStatsSummary = ({ transactions, year, month }: Props) => {
  const resolvedYear = year ?? new Date().getFullYear();
  const resolvedMonth = month ?? new Date().getMonth() + 1;

  const totals = getMonthlyCategoryTotals(
    transactions,
    resolvedYear,
    resolvedMonth
  );

  const entries = Object.entries(totals).sort((a, b) => b[1] - a[1]);

  const top3 = entries.slice(0, 3);

  const totalAmount = entries.reduce((sum, [, amount]) => sum + amount, 0);

  return (
    <section
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <h3>{resolvedMonth}월 카테고리별 지출 TOP 3</h3>

      {top3.length === 0 ? (
        <p style={{ color: "#6b7280", marginTop: "12px" }}>
          이번 달 지출 내역이 없습니다.
        </p>
      ) : (
        <div style={{ marginTop: "16px" }}>
          {top3.map(([category, amount], index) => {
            const percentage =
              totalAmount === 0 ? 0 : (amount / totalAmount) * 100;

            return (
              <div key={category} style={{ marginBottom: "14px" }}>
                {/* 라벨 */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "6px",
                    fontSize: "14px",
                  }}
                >
                  <span>{category}</span>
                  <span>
                    {amount.toLocaleString()}원 ·{" "}
                    {percentage.toFixed(1)}%
                  </span>
                </div>

                {/* 가로 막대 */}
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
                      backgroundColor: COLORS[index] ?? "#E5E7EB",
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
    </section>
  );
};

export default CategoryStatsSummary;
