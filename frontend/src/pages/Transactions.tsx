import { useState } from "react";
import Layout from "../components/layout/Layout";
import TransactionTable from "../components/dashboard/transactions/TransactionTable";
import { transactions } from "../data/transactions";

const getCurrentMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
};

const Transactions = () => {
  const [month, setMonth] = useState(getCurrentMonth());

  const filtered = transactions.filter((tx) =>
    tx.date.startsWith(month)
  );

  return (
    <Layout>
      <h2>거래내역 조회</h2>

      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />

      <TransactionTable transactions={filtered} />
    </Layout>
  );
};

export default Transactions;
