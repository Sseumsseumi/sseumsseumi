import { atom } from "jotai";

export type User = {
  userLoginId: string;
  userName: string;
};

export const userAtom = atom<User | null>(null);
export const authLoadingAtom = atom(true);