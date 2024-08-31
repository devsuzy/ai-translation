import { useEffect, useRef } from "react";
import { CustomIcon } from "@/components/CustomIcon";
import styles from "./styles.module.scss";
import { useRecoilState } from "recoil";
import { transValueState } from "@/stores/word";

export const Output = ({ desktop }: { desktop: boolean }) => {
  const outputRef = useRef<HTMLDivElement>(null);
  const [transValue, setTransValue] = useRecoilState(transValueState);
  const handleClickButton = async () => {
    try {
      await navigator.clipboard.writeText(transValue ?? "");
      alert("복사되었습니다.");
    } catch (err) {
      console.log("copy fail: ", err);
      alert("복사에 실패하였습니다.");
    }
  };

  useEffect(() => {
    if (outputRef.current)
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [transValue]);

  useEffect(() => {
    return () => {
      setTransValue("");
    };
  }, []);

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
