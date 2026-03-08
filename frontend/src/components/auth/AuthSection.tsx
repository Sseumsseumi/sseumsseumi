import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "../../api/auth";

const AuthSection = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const loginState = localStorage.getItem("isLogin");
    setIsLogin(loginState === "true");
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      console.warn("로그아웃 API 실패 또는 토큰 없음");
    } finally {
      localStorage.removeItem("isLogin");
      setIsLogin(false);
      navigate("/");
    }
  };

  if (!isLogin) {
    return (
      <section
        style={{
          background: "#ffffff",
          borderRadius: "12px",
          display: "flex",
          gap: "10px",
        }}
      >
        <NavLink to="/login" style={loginBtn}>
          로그인
        </NavLink>

        <NavLink to="/signup" style={signupBtn}>
          회원가입
        </NavLink>
      </section>
    );
  }

  return (
    <section
      style={{
        background: "#ffffff",
        borderRadius: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "15px",
      }}
    >
    <div
    style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
    }}
    >
        <div style={{ fontWeight: 600, fontSize: "16px" }}>김씀씀</div>
        <div style={{ fontSize: "14px", color: "#666" }}>kimss01</div>
    </div>

      <button onClick={handleLogout} style={logoutBtn}>
        로그아웃
      </button>
    </section>
  );
};

const loginBtn: React.CSSProperties = {
  padding: "8px 14px",
  borderRadius: "8px",
  background: "#FFD41D",
  color: "#fff",
  textDecoration: "none",
};

const signupBtn: React.CSSProperties = {
  padding: "8px 14px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  textDecoration: "none",
  color: "#000000",
};

const logoutBtn: React.CSSProperties = {
  padding: "10px 18px",
  borderRadius: "18px",
  border: "0.2px solid #D0D0D0",
  background: "#ffffff",
  cursor: "pointer",
  color: "#000000",
};

export default AuthSection;