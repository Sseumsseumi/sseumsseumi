import { useState } from "react";
import axiosClient from "../api/axiosClient";

const Signup = () => {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [userIdError, setUserIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateUserId = (value: string): boolean => {
    const regex = /^[a-zA-Z0-9]{1,20}$/;
    if (!regex.test(value)) {
      setUserIdError("사용할 수 없는 아이디입니다.");
      return false;
    }
    setUserIdError("");
    return true;
  };

  const validatePassword = (
    pw: string,
    confirm: string
  ): boolean => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,16}$/;

    if (!regex.test(pw)) {
      setPasswordError(
        "비밀번호는 8~16자의 영문 대/소문자, 숫자, 특수문자를 포함해야 합니다."
      );
      return false;
    }

    if (pw !== confirm) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
      return false;
    }

    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("click!") // Test 
    const isUserIdValid = validateUserId(userId);
    const isPasswordValid = validatePassword(
      password,
      passwordConfirm
    );

    if (!isUserIdValid || !isPasswordValid) return;

    try {
      const res = await axiosClient.post("user/regist", {
        id: userId,
        password,
        name,
      });

      console.log("회원가입 성공", res.data); // Test
      alert("성공"); // Test
    } catch (error: any) {
      const message =
        error?.response?.data?.dataHeader?.resultMessage;

      if (message) {
        setUserIdError(message);
      } else {
        alert("실패"); // Test
        console.error("회원가입 실패", error); //Test
      }
    }
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
          회원가입
        </h2>

        <label style={labelStyle}>이름</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="본명 입력"
          required
          style={inputStyle}
        />

        <label style={labelStyle}>아이디</label>
        <input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="영문 + 숫자 (최대 20자)"
          style={inputStyle}
        />
        {userIdError && <p style={errorStyle}>{userIdError}</p>}

        <label style={labelStyle}>비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="8~16자, 영문/숫자/특수문자"
          style={inputStyle}
        />

        <label style={labelStyle}>비밀번호 확인</label>
        <input
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          style={inputStyle}
        />
        {passwordError && <p style={errorStyle}>{passwordError}</p>}

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
          회원가입
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

const errorStyle: React.CSSProperties = {
  marginTop: "6px",
  color: "#ef4444",
  fontSize: "14px",
};

export default Signup;