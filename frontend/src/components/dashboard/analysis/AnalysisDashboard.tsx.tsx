import { useEffect, useState } from "react";
import AuthSection from "../../user/AuthSection";
import SummarySection from "./SummarySection";
import AccountSection from "../../user/AccountSection";

const LeftDashboard = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const loginState = localStorage.getItem("isLogin");
    setIsLogin(loginState === "true");
  }, []);

  return (
    <section
      style={{
        background: "#ffffff",
        padding: "30px",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <AuthSection />

      {isLogin && (
        <>
          <SummarySection />
          <AccountSection />
        </>
      )}
    </section>
  );
};

export default LeftDashboard;