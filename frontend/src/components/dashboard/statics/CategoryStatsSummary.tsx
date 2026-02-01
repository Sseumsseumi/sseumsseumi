import type { Transaction } from "../../../types/transaction";

interface Props {
  transactions: Transaction[];
}

const CategoryStatsSummary = ({ transactions }: Props) => {
  const categoryTotals = transactions
    .filter((tx) => tx.type === "OUT")
    .reduce<Record<string, number>>((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {});

  const sortedCategories = Object.entries(categoryTotals)
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
      <h3>카테고리별 지출 TOP 3</h3>

      <ul style={{ marginTop: "12px" }}>
        {sortedCategories.map(([category, amount]) => (
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
    </section>
  );
};

export default CategoryStatsSummary;
