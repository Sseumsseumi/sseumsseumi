import { useState } from "react";
import Layout from "../components/layout/Layout";
import TransactionTable from "../components/dashboard/transactions/TransactionTable";
import { transactions } from "../data/transactions";
import CategoryStatsTable from "../components/dashboard/statics/CategoryStatsTable";

const getCurrentMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
};

const Transactions = () => {
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

  const [year, month] = selectedMonth.split("-").map(Number);

  const filtered = transactions.filter((tx) =>
    tx.date.startsWith(selectedMonth)
  );

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
        <CategoryStatsTable
          transactions={transactions}
          year={year}
          month={month}
        />

        <TransactionTable transactions={filtered} />
      </div>
    </Layout>
  );
};

export default Transactions;
