import type { Transaction } from "../../../types/transaction";

interface Props {
  transactions: Transaction[];
}

const MonthlyTotalSummary = ({ transactions }: Props) => {
  const totalExpense = transactions
    .filter((tx) => tx.type === "OUT")
    .reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <section
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <h3>이번 달 총 지출</h3>

      <p
        style={{
          fontSize: "22px",
          fontWeight: "bold",
          margin: "12px 0",
        }}
      >
        {totalExpense.toLocaleString()}원
      </p>

      <p style={{ color: "#6b7280" }}>
        전월 대비 <strong style={{ color: "#ef4444" }}>+12%</strong>
      </p>
    </section>
  );
};

export default MonthlyTotalSummary;
