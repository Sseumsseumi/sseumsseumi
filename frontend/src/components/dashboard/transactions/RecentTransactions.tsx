import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TransactionTable from "./TransactionTable";
import {
  getTransactions,
  type TransactionResponse,
} from "../../../api/transaction";

const getRecent3DaysRange = () => {
  const today = new Date();

  const endDate = today.toISOString().slice(0, 10);

  const start = new Date();
  start.setDate(today.getDate() - 2);

  const startDate = start.toISOString().slice(0, 10);

  return { startDate, endDate };
};

const RecentTransactions = () => {
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchRecentTransactions = async () => {
      try {
        const { startDate, endDate } = getRecent3DaysRange();

        const data = await getTransactions(startDate, endDate);

        // 최신순 정렬 (날짜 + 시간)
        const sorted = [...data].sort((a, b) => {
          const dateA = new Date(
            `${a.transactionDate}T${a.transactionTime}`
          ).getTime();

          const dateB = new Date(
            `${b.transactionDate}T${b.transactionTime}`
          ).getTime();

          return dateB - dateA;
        });

        setTransactions(sorted);
      } catch (error) {
        console.error("최근 거래 조회 실패", error);
      }
    };

    fetchRecentTransactions();
  }, []);

  return (
    <section
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <h3>최근 거래 내역</h3>

      <TransactionTable transactions={transactions.slice(0, 5)} />

      <button onClick={() => navigate("/transactions")}>
        상세보기
      </button>
    </section>
  );
};

export default RecentTransactions;