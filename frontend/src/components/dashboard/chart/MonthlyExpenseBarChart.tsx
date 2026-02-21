import type { Transaction } from "../../../types/transaction";

interface Props {
  transactions: Transaction[];
}

const MonthlyExpenseBarChart = ({ transactions }: Props) => {
  const now = new Date();

  const monthlyTotals = Array.from({ length: 5 }).map((_, index) => {
    const date = new Date(
      now.getFullYear(),
      now.getMonth() - (4 - index),
      1
    );

    const year = date.getFullYear();
    const month = date.getMonth();

    const total = transactions
      .filter((tx) => {
        if (tx.type !== "OUT") return false;
        const txDate = new Date(tx.date);
        return (
          txDate.getFullYear() === year &&
          txDate.getMonth() === month
        );
      })
      .reduce((sum, tx) => sum + tx.amount, 0);

    return {
      label: `${month + 1}월`,
      total,
    };
  });

  const maxValue = Math.max(...monthlyTotals.map((m) => m.total), 1);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "12px",
        marginTop: "24px",
      }}
    >
      {monthlyTotals.map((month, index) => {
        const isCurrentMonth = index === monthlyTotals.length - 1;

        return (
          <div
            key={month.label}
            style={{
              flex: 1,
              textAlign: "center",
            }}
          >
            {/* 막대 기준 컨테이너 */}
            <div
              style={{
                height: "120px",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: `${(month.total / maxValue) * 100}%`,
                  backgroundColor: isCurrentMonth
                    ? "#FFA240"
                    : "#E5E7EB",
                  borderRadius: "6px 6px 0 0",
                  transition: "height 0.3s",
                }}
              />
            </div>

            <p style={{ marginTop: "8px", fontSize: "12px" }}>
              {month.label}
            </p>
            <p style={{ fontSize: "11px", color: "#6b7280" }}>
              {month.total.toLocaleString()}원
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default MonthlyExpenseBarChart;
