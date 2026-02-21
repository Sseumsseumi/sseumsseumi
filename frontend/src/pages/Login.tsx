import { useState } from "react";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 로그인 성공 여부 확인용
    console.log("로그인 시도", {
      userId,
      password,
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f4f6",
        padding: "16px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "380px",
          background: "#ffffff",
          padding: "32px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "24px" }}>
          로그인
        </h2>

        <label style={labelStyle}>아이디</label>
        <input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="아이디 입력"
          style={inputStyle}
        />

        <label style={labelStyle}>비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호 입력"
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            marginTop: "24px",
            padding: "12px",
            backgroundColor: "#FFC300",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          로그인
        </button>
      </form>
    </div>
  );
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginTop: "16px",
  marginBottom: "6px",
  fontWeight: 500,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  outline: "none",
};

export default Login;
