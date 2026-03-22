import type { MonthlyStatistics } from "../../../api/statistics";

interface Props {
  data: MonthlyStatistics[];
}

const MonthlyExpenseBarChart = ({ data }: Props) => {
  // 최근 4개월만 사용
  const monthlyTotals = data.slice(-4).map((m) => ({
    label: `${Number(m.month.split("-")[1])}월`,
    income: m.totalIncome,
    expenditure: m.totalExpenditure,
  }));

  const maxValue = Math.max(
    ...monthlyTotals.flatMap((m) => [
      m.income,
      m.expenditure,
    ]),
    1
  );

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
        const isCurrentMonth =
          index === monthlyTotals.length - 1;

        return (
          <div
            key={month.label}
            style={{
              flex: 1,
              textAlign: "center",
            }}
          >
            {/* 막대 영역 */}
            <div
              style={{
                height: "140px",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              {/* 수입 */}
              <div
                style={{
                  width: "40%",
                  height: `${
                    (month.income / maxValue) * 100
                  }%`,
                  backgroundColor: isCurrentMonth
                    ? "#60A5FA"
                    : "#DBEAFE",
                  borderRadius: "6px 6px 0 0",
                  transition: "height 0.3s",
                }}
              />

              {/* 지출 */}
              <div
                style={{
                  width: "40%",
                  height: `${
                    (month.expenditure / maxValue) * 100
                  }%`,
                  backgroundColor: isCurrentMonth
                    ? "#FFA240"
                    : "#E5E7EB",
                  borderRadius: "6px 6px 0 0",
                  transition: "height 0.3s",
                }}
              />
            </div>

            {/* 월 */}
            <p
              style={{
                marginTop: "8px",
                fontSize: "12px",
              }}
            >
              {month.label}
            </p>

            {/* 금액 */}
            <p
              style={{
                fontSize: "11px",
                color: "#6b7280",
              }}
            >
              ↑ {month.income.toLocaleString()}
              <br />
              ↓ {month.expenditure.toLocaleString()}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default MonthlyExpenseBarChart;