import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "../../api/auth";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const loginState = localStorage.getItem("isLogin");
    setIsLogin(loginState === "true");
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
      console.warn("로그아웃 API 실패 또는 토큰 없음");
    } finally {
      localStorage.removeItem("isLogin");
      setIsLogin(false);
      navigate("/");
    }
  };

  return (
    <aside
      style={{
        width: "220px",
        background: "#FFD41D",
        color: "#fff",
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <h2 style={{ marginBottom: "32px" }}>씀씀이</h2>

      <NavLink to="/" style={linkStyle}>
        홈
      </NavLink>

      <NavLink to="/mypage" style={linkStyle}>
        마이페이지
      </NavLink>

      {isLogin ? (
        <button onClick={handleLogout} style={logoutStyle}>
          로그아웃
        </button>
      ) : (
        <>
          <NavLink to="/login" style={linkStyle}>
            로그인
          </NavLink>

          <NavLink to="/signup" style={linkStyle}>
            회원가입
          </NavLink>
        </>
      )}
    </aside>
  );
};

const linkStyle: React.CSSProperties = {
  color: "#fff",
  textDecoration: "none",
};

const logoutStyle: React.CSSProperties = {
  background: "transparent",
  border: "none",
  color: "#fff",
  textAlign: "left",
  cursor: "pointer",
  fontSize: "16px",
  padding: 0,
};

export default Sidebar;