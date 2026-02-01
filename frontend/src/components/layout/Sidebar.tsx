import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside
      style={{
        width: "220px",
        background: "#111827",
        color: "#fff",
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <h2 style={{ marginBottom: "32px" }}>씀씀이</h2>

      <NavLink to="/" style={{ color: "#fff", textDecoration: "none" }}>
        홈
      </NavLink>

      <NavLink to="/mypage" style={{ color: "#fff", textDecoration: "none" }}>
        마이페이지
      </NavLink>

      <NavLink to="/login" style={{ color: "#fff", textDecoration: "none" }}>
        로그인
      </NavLink>
    </aside>
  );
};

export default Sidebar;
