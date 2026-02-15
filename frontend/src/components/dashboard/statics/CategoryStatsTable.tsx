import type { Transaction } from "../../../types/transaction";
import { getMonthlyCategoryTotals } from "../../../utils/categoryStats";

interface Props {
  transactions: Transaction[];
  year: number;
  month: number;
}

const CategoryStatsTable = ({ transactions, year, month }: Props) => {
  if (!year || !month) return null;

  const totals = getMonthlyCategoryTotals(transactions, year, month);

  const rows = Object.entries(totals).sort((a, b) => b[1] - a[1]);

  return (
    <section
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <h3>{month}월 카테고리별 지출 내역</h3>

      {rows.length === 0 ? (
        <p style={{ color: "#6b7280", marginTop: "12px" }}>
          지출 내역이 없습니다.
        </p>
      ) : (
        <ul style={{ marginTop: "12px" }}>
          {rows.map(([category, amount]) => (
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

export default CategoryStatsTable;
