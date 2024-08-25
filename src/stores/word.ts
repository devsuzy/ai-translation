import { getCookie } from "cookies-next";
import { atom, selector } from "recoil";

export const languageValueSelector = selector({
  key: "languageValueSelector",
  get: () => {
    return getCookie("lang") || "English";
  },
});

export const languageValueState = atom<string>({
  key: "languageValue",
  default: languageValueSelector,
});

export const transValueState = atom<string>({
  key: "transValue",
  default: "",
});
