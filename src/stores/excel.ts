import { atom } from "recoil";

type ProgressStateType = {
  length: number;
  count: number;
};

export const progressState = atom<ProgressStateType>({
  key: "progressNumber",
  default: { length: 0, count: 0 },
});
