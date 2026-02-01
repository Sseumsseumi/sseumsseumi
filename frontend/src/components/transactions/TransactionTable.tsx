import type { Transaction } from "../../types/transaction";

interface Props {
  transactions: Transaction[];
}

const TransactionTable = ({ transactions }: Props) => {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>카테고리</th>
          <th>계좌</th>
          <th>거래일자</th>
          <th>금액</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((tx) => (
          <tr key={tx.id}>
            <td>{tx.category}</td>
            <td>{tx.accountType}</td>
            <td>{tx.date}</td>
            <td
              style={{
                color: tx.type === "OUT" ? "red" : "blue",
                textAlign: "right",
              }}
            >
              {tx.type === "OUT" ? "-" : "+"}
              {tx.amount.toLocaleString()}원
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
