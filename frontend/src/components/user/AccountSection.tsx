import { useEffect, useState } from "react";
import { getAccounts, type Account } from "../../api/accounts";

const AccountSection = () => {
  const [accounts, setAccounts] = useState<Account[]>([
    {
      accountId: 13,
      accountBankName: "우리은행",
      accountName: "비상금 통장",
      accountNumber: "1002-345-778899",
      accountCreatedAt: "2023-03-20 05:45:00",
      accountBalance: 1200000,
    },
    {
      accountId: 14,
      accountBankName: "하나은행",
      accountName: "적금 통장",
      accountNumber: "356-910203-445",
      accountCreatedAt: "2022-06-05 07:30:00",
      accountBalance: 5000000,
    },
    {
      accountId: 15,
      accountBankName: "카카오뱅크",
      accountName: "생활비 통장",
      accountNumber: "3333-02-1234567",
      accountCreatedAt: "2023-07-31 23:00:00",
      accountBalance: 950000,
    },
  ]);

  /*
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await getAccounts();
        setAccounts(res.data.dataBody);
      } catch (e) {
        console.error(e);
      }
    };

    fetchAccounts();
  }, []);
  */

  return (
    <div>
      <h3 style={{ marginBottom: "12px" }}>내 계좌</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {accounts.map((account) => (
          <div
            key={account.accountId}
            style={{
              border: "1px solid #eee",
              borderRadius: "12px",
              padding: "16px",
              background: "#fafafa",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: "15px" }}>
                {account.accountBankName} · {account.accountName}
              </div>

              <div style={{ fontSize: "13px", color: "#666", marginTop: "2px" }}>
                {account.accountNumber}
              </div>
            </div>

            <div
              style={{
                fontSize: "20px",
                fontWeight: 700,
              }}
            >
              {account.accountBalance.toLocaleString()}원
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountSection;