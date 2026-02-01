import type { Transaction } from "../types/transaction";

export const transactions: Transaction[] = [
  {
    id: "1",
    category: "식비",
    accountType: "체크카드",
    date: "2026-01-12",
    amount: 12000,
    type: "OUT",
  },
  {
    id: "2",
    category: "교통",
    accountType: "체크카드",
    date: "2026-01-11",
    amount: 55000,
    type: "OUT",
  },
  {
    id: "3",
    category: "월급",
    accountType: "입출금통장",
    date: "2026-01-01",
    amount: 2500000,
    type: "IN",
  },
  {
    id: "4",
    category: "카페",
    accountType: "신용카드",
    date: "2026-01-10",
    amount: 4500,
    type: "OUT",
  },
  {
    id: "5",
    category: "편의점",
    accountType: "체크카드",
    date: "2026-02-01",
    amount: 8000,
    type: "OUT",
  },
  {
    id: "6",
    category: "구독",
    accountType: "신용카드",
    date: "2026-02-01",
    amount: 14900,
    type: "OUT",
  },
];
