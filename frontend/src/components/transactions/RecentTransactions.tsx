import { useNavigate } from "react-router-dom";
import type { Transaction } from "../../types/transaction";
import TransactionTable from "./TransactionTable";

interface Props {
  transactions: Transaction[];
}

const RecentTransactions = ({ transactions }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="card">
      <h3>최근 거래 내역</h3>

      <TransactionTable transactions={transactions.slice(0, 5)} />

      <button onClick={() => navigate("/transactions")}>
        상세보기
      </button>
    </div>
  );
};

export default RecentTransactions;
