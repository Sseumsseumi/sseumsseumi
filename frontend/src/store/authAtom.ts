import { atom } from "jotai";

export type User = {
  userId: number;
  userName: string;
};

export const userAtom = atom<User | null>(null);
export const authLoadingAtom = atom(true);