import { atom } from "recoil";

export const progressState = atom<number>({
  key: "progressNumber",
  default: 0,
});
