import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { userAtom } from "../../../store/authAtom";
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

const dummyData: TransactionResponse[] = [
  {
    transactionId: 2728,
    transactionDate: "2026-03-22",
    transactionTime: "11:19:47",
    transactionWithdrawal: 49570,
    transactionDeposit: 474774,
    transactionContent: "김민수",
    transactionBranch: "디금융",
    categoryName: "생활",
  },
];

const RecentTransactions = () => {
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);

  const [transactions, setTransactions] =
    useState<TransactionResponse[]>(dummyData);

  useEffect(() => {
    // 로그인 안했으면 API 호출 안함
    if (!user) return;

    const fetchRecentTransactions = async () => {
      try {
        const { startDate, endDate } = getRecent3DaysRange();
        const data = await getTransactions(startDate, endDate);

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
  }, [user]);

  return (
    <section
      style={{
        position: "relative",
        background: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <h3>최근 거래 내역</h3>

      <TransactionTable transactions={transactions.slice(0, 5)} />

      <button onClick={() => navigate("/transactions")}>
        상세보기
      </button>

      {/* 로그인 안했을 때 오버레이 */}
      {!user && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontWeight: 600,
            fontSize: "18px",
            backdropFilter: "blur(2px)",
          }}
        >
          🔒 로그인 후 확인할 수 있습니다
        </div>
      )}
    </section>
  );
};

export default RecentTransactions;