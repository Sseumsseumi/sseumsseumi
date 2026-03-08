import { useEffect, useState } from "react";
import AuthSection from "../../auth/AuthSection";
import SummarySection from "./SummarySection";

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

      {isLogin && <SummarySection />}
    </section>
  );
};

export default LeftDashboard;