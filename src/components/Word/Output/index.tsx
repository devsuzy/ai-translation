import { useRef } from "react";
import { CustomIcon } from "@/components/CustomIcon";
import styles from "./styles.module.scss";
import { useRecoilValue } from "recoil";
import { transValueState } from "@/stores/word";

export const Output = ({ desktop }: { desktop: boolean }) => {
  const outputRef = useRef<HTMLDivElement>(null);
  const transValue = useRecoilValue(transValueState);
  const handleClickButton = async () => {
    const text = outputRef.current?.innerText;
    try {
      await navigator.clipboard.writeText(text ?? "");
      alert("복사되었습니다.");
    } catch (err) {
      console.log("copy fail: ", err);
      alert("복사에 실패하였습니다.");
    }
  };

  return (
    <div className={styles["output-wrap"]}>
      <section>
        <div className={styles["output-result"]} ref={outputRef}>
          {transValue}
        </div>
        <button className={styles["button"]} onClick={handleClickButton}>
          {desktop ? (
            "복사"
          ) : (
            <CustomIcon iconType={"copy"} size={"m"} stroke="white" />
          )}
        </button>
      </section>
    </div>
  );
};
