import { NavLink, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../../store/authAtom";
import { logout } from "../../api/auth";

const AuthSection = () => {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      setUser(null); // 로그인 상태 제거
      navigate("/");
    }
  };

  if (!user) {
    return (
      <section
        style={{
          background: "#ffffff",
          borderRadius: "12px",
          display: "flex",
          gap: "10px",
          padding: "15px"
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
        <div style={{ fontWeight: 600, fontSize: "16px" }}>
          {user.userName}
        </div>
        <div style={{ fontSize: "14px", color: "#666" }}>
          {user.userId}
        </div>
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