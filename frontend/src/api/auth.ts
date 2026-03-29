import axiosClient from "./axiosClient";

export interface SignupRequest {
  id: string;
  password: string;
  name: string;
}

export const signup = (data: SignupRequest) => {
  return axiosClient.post("/api/v1/user/regist", data);
};

export interface LoginRequest {
  id: string;
  password: string;
}

export const login = (data: LoginRequest) => {
  return axiosClient.post("/api/v1/auth/login", data);
};

export const logout = () => {
  return axiosClient.get("/api/v1/auth/logout");
};

export interface UserInfo {
  userId: number;
  userName: string;
}

export const getUserInfo = async (): Promise<UserInfo> => {
  const res = await axiosClient.get("/api/v1/user/info");

  return res.data.dataBody;
};