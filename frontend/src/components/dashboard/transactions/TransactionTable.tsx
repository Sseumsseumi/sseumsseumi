import type { TransactionResponse } from "../../../api/transaction";

interface Props {
  transactions: TransactionResponse[];
}

const TransactionTable = ({ transactions }: Props) => {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>카테고리</th>
          <th>지점</th>
          <th>거래일자</th>
          <th>내용</th>
          <th>금액</th>
        </tr>
      </thead>

      <tbody>
        {transactions.map((tx) => {
          const isOut = tx.transactionWithdrawal > 0;
          const amount = isOut
            ? tx.transactionWithdrawal
            : tx.transactionDeposit;

          return (
            <tr key={tx.transactionId}>
              <td>{tx.categoryName}</td>
              <td>{tx.transactionBranch}</td>
              <td>
                {tx.transactionDate} {tx.transactionTime}
              </td>
              <td>{tx.transactionContent}</td>

              <td
                style={{
                  color: isOut ? "red" : "blue",
                  textAlign: "right",
                }}
              >
                {isOut ? "-" : "+"}
                {amount.toLocaleString()}원
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TransactionTable;