import { useCallback, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { languageValueState, transValueState } from "@/stores/word";
import { CustomIcon } from "@/components/CustomIcon";
import { TransAPI } from "@/pages/api/trans";

import styles from "./styles.module.scss";
import useDebounce from "@/hooks/useDebounce";

export const Input = ({ desktop }: { desktop: boolean }) => {
  const languageValue = useRecoilValue(languageValueState);
  const setTransValue = useSetRecoilState(transValueState);
  const [input, setInput] = useState("");
  const debounceValue = useDebounce(input, 500);

  const PostTransValue = useCallback(
    async (input: string) => {
      if (!input || input.trim() === "") {
        setTransValue("");
        return;
      }
      const result = await TransAPI({ text: input, language: languageValue });
      setTransValue(result);
    },
    [languageValue, setTransValue]
  );

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    PostTransValue(debounceValue);
  }, [debounceValue, PostTransValue]);

  return (
    <div className={styles["input-wrap"]}>
      <section>
        <textarea
          name=""
          id=""
          onChange={handleChangeInput}
          value={input}
        ></textarea>
        <button
          className={styles["button"]}
          onClick={() => PostTransValue(input)}
        >
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
