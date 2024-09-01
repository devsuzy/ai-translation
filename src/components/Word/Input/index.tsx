import { useCallback, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { languageValueState, transValueState } from "@/stores/word";
import { CustomIcon } from "@/components/CustomIcon";

import styles from "./styles.module.scss";
import { TransAPI } from "@/lib/api/trans";
import { toastWithResponsive } from "@/utils/toastWithResponsive";
import { checkIsMobile } from "@/utils/isMobile";

export const Input = ({ desktop }: { desktop: boolean }) => {
  const languageValue = useRecoilValue(languageValueState);
  const setTransValue = useSetRecoilState(transValueState);
  const [input, setInput] = useState("");

  // const debounceValue = useDebounce(input, 500);

  const shiftRef = useRef(false);
  const translationRef = useRef(false);

  const PostTransValue = useCallback(
    async (input: string) => {
      if (!input || input.trim() === "") {
        setTransValue("");
        return;
      }

      if (translationRef.current) return;

      toastWithResponsive("info", <p>번역중 ...</p>, {
        position: "bottom-right",
      });
      translationRef.current = true;

      const result = await TransAPI({ text: input, language: languageValue });
      setTransValue(result);
      toastWithResponsive("success", <p>번역완료</p>, {
        position: "bottom-right",
      });
      setTimeout(() => {
        translationRef.current = false;
      }, 1000);
    },
    [languageValue, setTransValue]
  );

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (checkIsMobile()) return;

    if (e.key === "Shift") {
      shiftRef.current = false;
    }
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (checkIsMobile()) return;

    if (e.key === "Shift") {
      shiftRef.current = true;
    }

    if (!shiftRef.current && e.key === "Enter") {
      e.preventDefault();
    }

    if (!shiftRef.current && !translationRef.current && e.key === "Enter") {
      PostTransValue(input);
    }
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
          onKeyDown={handleKeydown}
          onKeyUp={handleKeyUp}
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
