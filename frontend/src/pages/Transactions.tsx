import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import TransactionTable from "../components/dashboard/transactions/TransactionTable";
import {
  getTransactions,
  type TransactionResponse,
} from "../api/transaction";

const getCurrentMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
};

const getMonthRange = (year: number, month: number) => {
  const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
  const lastDay = new Date(year, month, 0).getDate();
  const endDate = `${year}-${String(month).padStart(2, "0")}-${lastDay}`;

  return { startDate, endDate };
};

const Transactions = () => {
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [transactions, setTransactions] = useState<
    TransactionResponse[]
  >([{
            "transactionId": 2728,
            "transactionDate": "2026-03-22",
            "transactionTime": "11:19:47",
            "transactionWithdrawal": 49570,
            "transactionDeposit": 474774,
            "transactionContent": "김민수",
            "transactionBranch": "디금융",
            "categoryName": "생활"
        }]);

  const [year, month] = selectedMonth.split("-").map(Number);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { startDate, endDate } = getMonthRange(year, month);

        const data = await getTransactions(startDate, endDate);
        setTransactions(data);
      } catch (error) {
        console.error("거래내역 조회 실패", error);
      }
    };

    fetchTransactions();
  }, [selectedMonth]);

  return (
    <Layout>
      <h2>거래내역 조회</h2>

      <input
        type="month"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "24px",
          marginTop: "24px",
        }}
      >
        <TransactionTable transactions={transactions} />
      </div>
    </Layout>
  );
};

export default Transactions;