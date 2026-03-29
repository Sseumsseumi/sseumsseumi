import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "../../store/authAtom";
import { getAccounts, type Account } from "../../api/accounts";

const dummyAccounts: Account[] = [
  {
    accountId: 13,
    accountBankName: "우리은행",
    accountName: "비상금 통장",
    accountNumber: "1002-345-778899",
    accountCreatedAt: "2023-03-20 05:45:00",
    accountBalance: 1200000,
  },
];

const AccountSection = () => {
  const user = useAtomValue(userAtom);

  const [accounts, setAccounts] =
    useState<Account[]>(dummyAccounts);

  useEffect(() => {
    // 로그인 안하면 API 호출 X
    if (!user) return;

    const fetchAccounts = async () => {
      try {
        const res = await getAccounts();
        setAccounts(res.data.dataBody);
      } catch (e) {
        console.error(e);
      }
    };

    fetchAccounts();
  }, [user]);

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <h3 style={{ marginBottom: "10px", padding: "15px"}}>내 계좌</h3>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
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
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "15px",
                }}
              >
                {account.accountBankName} ·{" "}
                {account.accountName}
              </div>

              <div
                style={{
                  fontSize: "13px",
                  color: "#666",
                  marginTop: "2px",
                }}
              >
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

      {/* 로그인 잠금 */}
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
            borderRadius: "12px",
          }}
        >
          🔒 로그인 후 확인할 수 있습니다
        </div>
      )}
    </div>
  );
};

export default AccountSection;