import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { languageValueState, transValueState } from "@/stores/word";
import { CustomIcon } from "@/components/CustomIcon";
import { TransAPI } from "@/pages/api/trans";

import styles from "./styles.module.scss";

function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>): void {
    const context = this;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

export const Input = ({ desktop }: { desktop: boolean }) => {
  const languageValue = useRecoilValue(languageValueState);
  const [transValue, setTransValue] = useRecoilState(transValueState);
  const [input, setInput] = useState("");
  const handleTransValue = async () => {
    const result = await TransAPI({ text: input, language: languageValue });
    setTransValue(result);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className={styles["input-wrap"]}>
      <section>
        <textarea
          name=""
          id=""
          onChange={handleChangeInput}
          value={input}
        ></textarea>
        <button className={styles["button"]} onClick={handleTransValue}>
          {desktop ? (
            "번역"
          ) : (
            <CustomIcon iconType={"arrowRight"} size={"m"} stroke="white" />
          )}
        </button>
      </section>
    </div>
  );
};
