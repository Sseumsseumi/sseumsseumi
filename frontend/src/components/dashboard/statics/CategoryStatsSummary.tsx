import type { Transaction } from "../../../types/transaction";
import { getMonthlyCategoryTotals } from "../../../utils/categoryStats";

interface Props {
  transactions: Transaction[];
  year?: number;
  month?: number;
}

const CategoryStatsSummary = ({ transactions, year, month }: Props) => {
  const resolvedYear = year ?? new Date().getFullYear();
  const resolvedMonth = month ?? new Date().getMonth() + 1;

  const totals = getMonthlyCategoryTotals(
    transactions,
    resolvedYear,
    resolvedMonth
  );

  const top3 = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

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
        <ul style={{ marginTop: "12px" }}>
          {top3.map(([category, amount]) => (
            <li
              key={category}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span>{category}</span>
              <strong>{amount.toLocaleString()}원</strong>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default CategoryStatsSummary;
