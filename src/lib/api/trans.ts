import axios from "axios";

const BASE_API_URL = "https://imchat-api.ifdev.cc/chat/gpt";

export const api = axios.create({
  baseURL: BASE_API_URL,
});

export interface TransWordRequest {
  text: string;
  language: string;
}

export const TransSituation = (lang: string) =>
  `Act as a professinoal translator working in commerce company.\nTranslate the following text to ${lang}.\nAll Translated sentences must be translated with as much detail as possible\nPrint ONLY Translated text.`;

export const TransAPI = async ({ text, language }: TransWordRequest) => {
  return await api
    .post("", {
      type: "trans",
      text: text,
      count: "",
      situation: TransSituation(language),
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};
