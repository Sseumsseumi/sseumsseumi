import type { Transaction } from "../../../types/transaction";
import MonthlyExpenseBarChart from "../chart/MonthlyExpenseBarChart";

interface Props {
  transactions: Transaction[];
}

const MonthlyTotalSummary = ({ transactions }: Props) => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const currentMonthTotal = transactions
    .filter((tx) => {
      if (tx.type !== "OUT") return false;
      const date = new Date(tx.date);
      return (
        date.getFullYear() === currentYear &&
        date.getMonth() === currentMonth
      );
    })
    .reduce((sum, tx) => sum + tx.amount, 0);

  const prevMonthDate = new Date(currentYear, currentMonth - 1, 1);
  const prevYear = prevMonthDate.getFullYear();
  const prevMonth = prevMonthDate.getMonth();

  const prevMonthTotal = transactions
    .filter((tx) => {
      if (tx.type !== "OUT") return false;
      const date = new Date(tx.date);
      return (
        date.getFullYear() === prevYear &&
        date.getMonth() === prevMonth
      );
    })
    .reduce((sum, tx) => sum + tx.amount, 0);

  const diffAmount = currentMonthTotal - prevMonthTotal;
  const isIncrease = diffAmount > 0;

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
        {currentMonthTotal.toLocaleString()}원
      </p>

      <p style={{ color: "#6b7280" }}>
        전월 대비{" "}
        <strong style={{ color: isIncrease ? "#ef4444" : "#22c55e" }}>
          {isIncrease ? "+" : "-"}
          {Math.abs(diffAmount).toLocaleString()}원
        </strong>
      </p>

      {/* 월별 막대그래프 */}
      <MonthlyExpenseBarChart transactions={transactions} />
    </section>
  );
};

export default MonthlyTotalSummary;
