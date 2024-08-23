import { atom } from "recoil";

export const languageValueState = atom<string>({
  key: "languageValue",
  default: "English",
});

export const transValueState = atom<string>({
  key: "transValue",
  default: "",
});
